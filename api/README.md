# API Directory

This directory is reserved for Azure Functions API endpoints.

Currently, the application uses a mock API service located at `src/api/resilience.ts`.

For production deployment with real backend APIs, you would:
1. Create Azure Functions here
2. Configure them in `staticwebapp.config.json`
3. Update the frontend to call `/api/*` endpoints

Example structure:
```
api/
  assess/
    index.ts  (Azure Function for resilience assessment)
  package.json
```
