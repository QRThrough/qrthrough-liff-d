# QRThrough: LINE Frontend Framework for Moderator Dashboard

## Description

This is a LINE Frontend Framework application for the moderator dashboard of the QRThrough system. It is built using the [LINE Frontend Framework (LIFF)](https://developers.line.biz/en/docs/liff/overview/) and [Mantine](https://mantine.dev/). The moderator dashboard is a web application that allows moderators to manage the configuration of the QRThrough system, manage the user information, manage the moderator information, and display the usage transaction of the QRThrough system.

## Features

In this application, moderators can:

- Sign in with LINE Login
- Display/Manage the configuration of QRThrough system
- RUD (Read, Update, Delete) the user information
- RUD (Read, Update, Delete) the moderator information
- Display the usage transaction of the QRThrough system
- Export the information of the users, moderators, and usage transaction to the CSV file

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Make](https://www.gnu.org/software/make/)

### Installation

1. Install dependencies

   ```bash
   npm install
   ```

2. Create a `.env.dev` file in the env directory and add the following environment variables

   ```
   VITE_LIFF_ID= // LINE Frontend Framework ID
   VITE_API_URL= // API URL
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

## Deployment

1. Create a `.env.prod` file in the env directory and add the following environment variables

   ```
   VITE_LIFF_ID= // LINE Frontend Framework ID
   VITE_API_URL= // API URL
   ```

2. Configure the `makefile` file to deploy the server to the server. You can find the `makefile` file in the root directory of the project. You need to change the following variables:

- First, change the `REMOTE_HOST` variable to the server's IP address or hostname.
- Second, change the `APP_NAME` variable to the name of the application and contrainer name.

3. Run the following command to deploy the server to the server with two situations:

- Initial deployment:

  ```bash
  make init-deploy
  ```

- Update deployment:

  ```bash
  make build-deploy
  ```

4. During the deployment, If you not have the `ssh` key to connect to the server, you need to enter the password to connect to the server.

## Authors

- [JM jirapat](https://github.com/JMjirapat) - Developer
