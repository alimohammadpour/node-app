# node-app

A coding challenge project.

## Dependencies

Ensure the following are installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Getting Started

To set up the project locally, follow these steps:

### 1. Clone the Repository

```
git clone https://github.com/alimohammadpour/node-app.git
cd node-app
```

### 2. Environment Variables
Copy the example environment files for both the main application and the MongoDB service:

```
cp .env.example .env
cp mongo/.env.example mongo/.env
```

### 3. Start the applications and Database
```
docker-compose up -d
```

### 4. Testing
```
docker-compose exec node yarn test
docker-compose exec web yarn test
```