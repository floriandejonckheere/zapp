# Zapp

![Continuous Integration](https://github.com/floriandejonckheere/zapp/workflows/Continuous%20Integration/badge.svg)

Zapp is a smart energy assistant for the RESPONSE2020 Energy Management System (EMS) project.

Navigate to [https://zapp.dejonckhee.re](https://zapp.dejonckhee.re) to access the application.

## Development

Build and start the backend application:

```sh
docker compose up -d app
```

Seed the database with example data:

```sh
docker compose exec -ti app python manage.py loaddata app/fixtures.json app/users/fixtures.json app/infrastructure/fixtures.json app/schedule/fixtures.json
```

Build and start the frontend application:

```sh
pnpm run dev
```

The application is now available at [http://localhost:5173](http://localhost:5173).
Log in with `admin` / `password`.

## License

Copyright 2024 Florian Dejonckheere, Otto Heldt, Joni Rajamäki
