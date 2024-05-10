# Backend build stage
FROM python:3.12-alpine AS python

ENV RUNTIME_DEPS postgresql
ENV BUILD_DEPS build-base postgresql-dev

ENV APP_HOME /app
WORKDIR $APP_HOME/

# Install system dependencies
RUN apk add --no-cache $BUILD_DEPS $RUNTIME_DEPS

# Install Python dependencies
ADD requirements.txt $APP_HOME/

RUN pip install --no-cache-dir -r requirements.txt

# Backend production stage
FROM python AS app

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8

ENV APP_HOME /app
WORKDIR $APP_HOME/

# Add user
ARG USER=docker
ARG UID=1000
ARG GID=1000

RUN addgroup -g $GID $USER
RUN adduser -D -u $UID -G $USER -h $APP_HOME/ $USER

# Add application
ADD . $APP_HOME/

RUN chown -R $UID:$GID $APP_HOME/

# Change user
USER $USER

EXPOSE 8000

CMD ["gunicorn", "app.wsgi", "--bind", "0.0.0.0:8000"]

# Frontend build stage
FROM node:18-alpine AS node

ENV APP_HOME /app
WORKDIR $APP_HOME/

# Install correct Yarn version
RUN corepack enable && corepack prepare yarn@stable --activate && yarn set version 4.0.2 && yarn install

# Install NPM dependencies
ADD package.json $APP_HOME/
ADD yarn.lock $APP_HOME/

RUN yarn install

# Add web application
ADD . $APP_HOME/

# Build web application
RUN yarn build

# Frontend production stage
FROM nginx as web

COPY --from=node /app/dist /usr/share/nginx/html

ADD nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
