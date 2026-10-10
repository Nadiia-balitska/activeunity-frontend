# ActiveUnity

ActiveUnity is a full-stack web application developed for coordinating social, volunteer, community and association-based initiatives.

The goal of the project is to make it easier for people to create, find and join events, while also giving organizers tools to manage activities, participants and communication in one place.

## Description

ActiveUnity is designed for communities, associations and volunteer initiatives that need a simple digital platform for event coordination.

The application allows users to browse events, view detailed event information, register an account, log in, create and manage events, join or leave activities, and interact with other participants. Organizers can use the system to publish events, update event information and manage participation.

The project focuses on solving a practical problem: many small communities and volunteer groups organize activities through scattered tools such as chats, spreadsheets and social media. ActiveUnity brings the main coordination features into one web application.

## Main Features

- User registration and login
- Authentication and protected routes
- User profiles
- Event listing
- Event details page
- Create, edit and delete events
- Join and leave events
- Participant management
- Image upload for events or profiles
- Responsive user interface
- API documentation
- Error handling and loading states

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- Axios

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT authentication
- bcrypt
- Swagger
- Cloudinary


## Project Structure

```bash
ActiveUnity/
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── next.config.js
│
├── server/
│   ├── src/
│   ├── package.json
│   └── server.js
│
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_LINK_HERE
```

### 2. Open the project folder

```bash
cd ActiveUnity
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Install backend dependencies

```bash
cd ../server
npm install
```

## Environment Variables

Create a `.env` file in the backend folder and add the required environment variables.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

If the frontend uses environment variables, create a `.env.local` file inside the client folder.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Project Locally

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

Open a new terminal:

```bash
cd client
npm run dev
```

The frontend will usually run on:

```bash
http://localhost:3000
```

The backend will usually run on:

```bash
http://localhost:5000
```

## API Documentation

The backend API is documented with Swagger.

After starting the backend server, the API documentation can be opened in the browser.

Example:

```bash
http://localhost:5000/api-docs
```

## Main API Areas

- Authentication
- Users
- Events
- Event participation
- Image upload

## Development Process

The project was developed using a full-stack approach. The frontend and backend were built separately, but they communicate through REST API requests.

The frontend is responsible for the user interface, routing and client-side interaction. The backend is responsible for authentication, database operations, business logic and API responses.

MongoDB Atlas was used as a cloud database, and Cloudinary was used for media handling.

## Future Improvements

Possible future improvements include:

- Advanced event search and filtering
- Notifications
- Messaging between users
- Admin dashboard
- Better organizer tools
- Calendar integration
- Improved accessibility
- More detailed user roles and permissions

## Author

Created by Nadiia Balitska as part of a bachelor's project.

## License

This project was created for educational purposes.
