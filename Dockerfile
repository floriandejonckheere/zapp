FROM python:3.12-alpine

MAINTAINER Florian Dejonckheere <florian@floriandejonckheere.be>
LABEL org.opencontainers.image.source https://github.com/floriandejonckheere/zapp

ENV RUNTIME_DEPS postgresql
ENV BUILD_DEPS build-base postgresql-dev

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8

ENV APP_HOME /app/
WORKDIR $APP_HOME/

# Add user
ARG USER=docker
ARG UID=1000
ARG GID=1000

RUN addgroup -g $GID $USER
RUN adduser -D -u $UID -G $USER -h $APP_HOME/ $USER

# Install system dependencies
RUN apk add --no-cache $BUILD_DEPS $RUNTIME_DEPS

# Install Python dependencies
ADD requirements.txt $APP_HOME/

RUN pip install --no-cache-dir -r requirements.txt

# Add application
ADD . $APP_HOME/

RUN chown -R $UID:$GID $APP_HOME/

# Change user
USER $USER

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
