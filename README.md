# Zapp

![Continuous Integration](https://github.com/floriandejonckheere/zapp/workflows/Continuous%20Integration/badge.svg)

Zapp is a smart energy assistant for the RESPONSE2020 Energy Management System (EMS) project.

Navigate to [https://zapp.dejonckhee.re](https://zapp.dejonckhee.re) to access the application.

<p align="center" width="100%">
    <a href="https://github.com/floriandejonckheere/zapp/raw/master/1-signin.png"><img src="https://github.com/floriandejonckheere/zapp/raw/master/1-signin.png" width="24%" height="auto"></a>
    <a href="https://github.com/floriandejonckheere/zapp/raw/master/2-signup.png"><img src="https://github.com/floriandejonckheere/zapp/raw/master/2-signup.png" width="24%" height="auto"></a>
    <a href="https://github.com/floriandejonckheere/zapp/raw/master/3-overview.png"><img src="https://github.com/floriandejonckheere/zapp/raw/master/3-overview.png" width="24%" height="auto"></a>
</p>

<p align="center" width="100%">
    <a href="https://github.com/floriandejonckheere/zapp/raw/master/4-schedule.png"><img src="https://github.com/floriandejonckheere/zapp/raw/master/4-schedule.png" width="24%" height="auto"></a>
    <a href="https://github.com/floriandejonckheere/zapp/raw/master/5-schedule.png"><img src="https://github.com/floriandejonckheere/zapp/raw/master/5-schedule.png" width="24%" height="auto"></a>
    <a href="https://github.com/floriandejonckheere/zapp/raw/master/6-infrastructure.png"><img src="https://github.com/floriandejonckheere/zapp/raw/master/6-infrastructure.png" width="24%" height="auto"></a>
    <a href="https://github.com/floriandejonckheere/zapp/raw/master/7-infrastructure.png"><img src="https://github.com/floriandejonckheere/zapp/raw/master/7-infrastructure.png" width="24%" height="auto"></a>
</p>

## Development

Start the database container:

```sh
docker compose up -d postgres
```

Create a database:

```sh
docker compose exec postgres psql -U postgres -c "CREATE DATABASE zapp_development"
```

Build and start the backend application:

```sh
docker compose up -d app
```

Migrate the database:

```sh
docker compose exec app python manage.py migrate
```

Seed the database with example data:

```sh
docker compose exec app python manage.py loaddata app/fixtures.json app/users/fixtures.json app/infrastructure/fixtures.json app/schedule/fixtures.json
```

Install Node.js 20.
Install [pnpm](https://pnpm.io):

```sh
corepack enable
corepack prepare pnpm@stable --activate
```

Install the dependencies:

```sh
pnpm install
```

Build and start the frontend application:

```sh
pnpm run dev
```

The application is now available at [http://localhost:5173](http://localhost:5173).
Log in with `admin` / `password`.

Easily reseed the database with the following commands:

```
docker compose exec postgres dropdb -U postgres zapp_development
docker compose exec postgres createdb -U postgres zapp_development
docker compose run --rm app python manage.py migrate
docker compose run --rm app python manage.py loaddata app/fixtures.json app/users/fixtures.json app/infrastructure/fixtures.json app/schedule/fixtures.json
```

## License

Copyright 2024 Florian Dejonckheere, Otto Heldt, Joni Rajamäki
