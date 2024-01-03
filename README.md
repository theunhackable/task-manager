# Task Manager
This is a simple app that lets you track your tasks.

# Project Setup

you can setup this project locally using docker.

- Clone the repository.
- On the root of the `task-manager` folder run `docker compose up`.
- Use sudo if necessary.

# packages used

## Backend
- express: http server
- mongoose: As an orm for the mongodb
- helmet: For enhanced security
- morgan: For logging
- jsonwebtoken: For authentication and authorization
- body-parser: For parcing the body
- mongodb: as a database
  
## Frontend

- Next.js: as a frontend framework
- TailwindCSS: for styling
- ShadCn: Components
- Tabler Icons
- Playwright: For testing


## Testing the frontend

I have used playwright for testing the frontend.
For testing locally:
Go to the `frontend` folder.
```
cd frontend
```
Install required dependencies.
```
npm ci
```

Install playwright browsers

```
npx playwright install
```

Run tests.
```
npx playwright test.
```
