# Zapp

![Continuous Integration](https://github.com/floriandejonckheere/zapp/workflows/Continuous%20Integration/badge.svg)

Zapp is a smart energy assistant for the RESPONSE2020 Energy Management System (EMS) project.

Navigate to [https://zapp.dejonckhee.re](https://zapp.dejonckhee.re) to access the application.

## Development

Build and start the backend application:

```sh
docker compose up -d app
```

Create a superuser:

```sh
docker compose exec -ti app python manage.py createsuperuser
```

Seed the database with example data:

```sh
docker compose exec -ti app python manage.py loaddata app/users/fixtures.json
docker compose exec -ti app python manage.py loaddata app/infrastructure/fixtures.json
```

Build and start the frontend application:

```sh
yarn run dev
```

The application is now available at [http://localhost:5173](http://localhost:5173).

## License

Copyright 2024 Florian Dejonckheere, Otto Heldt, Joni Rajamäki
