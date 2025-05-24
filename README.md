# Skailama Assignment

## Project Overview

This project is a full-stack web application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The primary focus of the application is to provide a secure user authentication system using JSON Web Tokens (JWT) and manage projects and episodes.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Styling:** Vanilla CSS

## Project Setup

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed
- MongoDB server running

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ajmalmirsha/Skailama.git
    ```
    
### Setup server

3. Navigate to the directory & Install dependencies:

      ```bash
    cd server
    npm install
    ```
4. Create a `.env` file in the root directory and add your environment variables:

    ```env
    BASE_URL=http://localhost:5173
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```
5. Run the development server:

    ```bash
    npm start
    ```


3. Navigate to the directory & Install dependencies:

    ```bash
    cd client
    npm install
    ```

      ```bash
    cd server
    npm install
    ```

### Setup Client

3. Navigate to the directory & Install dependencies:

      ```bash
    cd client
    npm install
    ```
4. Create a `.env` file in the root directory and add your environment variables:

    ```env
    VITE_BASE_URL= <server url> eg:- http://localhost:3000
    ```
5. Run the application:

    ```bash
    npm run dev
    ```

6. Open your browser and visit `http://localhost:5173` to see the website.

### Deployment

The project is deployed You can view the live version [here](https://assignment-skailama-ajmal.netlify.app).

## Project Structure

```bash
skailama/
│
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── Api/
│   │   ├── assets/
│   │   ├── Components/
│   │   ├── Context/
│   │   ├── Layout/
│   │   ├── Pages/
│   │   ├── Utils/
│   │   └── .env
│   │   └── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                 # Express backend
│   ├── Controllers/
│   ├── Middlewares/
│   ├── Models/
│   ├── router/
│   ├── Utils/
│   ├── .env
│   └── index.js
│
├── README.md
