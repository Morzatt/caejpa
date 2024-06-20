![MIT License](https://img.shields.io/github/license/morzatt/caejpa)

# Management & Administration System CAEJPA.

Offline, easy to use, simple and user-friendly web application designed to automate the workflow and transactions of the Public Savings Bank CAEJPA.

## ⚡ Features

  - Full CRUD Operations: Create, Read, Update and Delete.
  - Database Backup and Restoration from within the application.
  - User's Roles and Statuses management.
  - Password Recovery functions.
  - PDF Printouts.
  - User's Manual included.
    
## 🧱 Technologies

  - Framework: [SvelteKit](https://github.com/sveltejs/svelte) and [Tailwind](https://github.com/tailwindlabs/tailwindcss) for the client, with [Express](https://github.com/expressjs/express) for the backend, along with [TypeScript](https://github.com/microsoft/TypeScript) used as the main language all over the project.
  - DB: [MySQL](https://www.mysql.com/) as the main DB client.
  - Tests: Unit and integration tests with [Vitest](https://vitest.dev/)


<img src="https://github.com/Morzatt/caejpa/assets/133164141/86d91892-91ce-4df5-9a9c-1a1e9d001867" style="display: block;margin-left: auto;margin-right: auto;">

## <a name="start"></a>✨ Getting Started

### Installation

```sh
git clone https://github.com/morzatt/caejpa
cd caejpa

cd server
npm i

cd client
npm i

npm run dev # run in development mode with tsc -- --watch and nodemon
npm start # run in production mode
```

### Environment Variables

This app needs the following environment Variables

- `NODE_ENV` node environment configuration.
- `PORT` Port for the HTTP Express Server.
- `HOST` Host for the HTTP Express Server.
- `COOKIE_SECRET` Secret to code and decode cookies.
- `DBHOST` Database Host.
- `DBUSER` Database User.
- `DBPORT` Database Port.
- `DBPWD` Database Password.
- `DBNAME` Database's Name.

### App Preview

https://github.com/Morzatt/caejpa/assets/133164141/c3c7cd46-8aa7-4b44-b278-770ca29a47f2

https://github.com/Morzatt/caejpa/assets/133164141/6861b5ed-2b26-4df5-97ac-a8e851ac0090

https://github.com/Morzatt/caejpa/assets/133164141/8f43e155-e598-488b-b1b6-0c8117d0b6d1

