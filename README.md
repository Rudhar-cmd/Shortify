# Shortify

Shortify is a full-stack URL shortening application built with React, Node.js, Express, and MongoDB. It allows users to create, manage, and analyze shortened URLs.

## Features

- User registration and login
- JWT authentication with HTTP-only cookies
- Create and manage short URLs
- URL redirection
- Click tracking and analytics
- Track IP, user-agent, referrer, and click time
- Protected routes
- Responsive UI

## Tech Stack

**Frontend**
- React.js
- Vite
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

**Deployment**
- Netlify
- Render
- MongoDB Atlas

## Project Structure

```text
Shortify/
├── Backend/
│   └── src/
│       ├── config/
│       ├── controller/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── app.js
│       └── index.js
│
├── Frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── index.css
│
└── README.md
API
Method	Endpoint	Description
POST	/api/v1/users/register	Register
POST	/api/v1/users/login	Login
POST	/api/v1/users/logout	Logout
POST	/api/v1/url/shorten	Create short URL
GET	/api/v1/url/my-urls	Get user's URLs
PATCH	/api/v1/url/:id	Update URL
DELETE	/api/v1/url/:id	Delete URL
GET	/api/v1/analytics/:id	Get analytics
GET	/:shortCode	Redirect to original URL
Local Setup
Backend
cd Backend
npm install
npm run dev

Create .env:

MONGO_URL=your_mongodb_url
PORT=5001
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRY=7d
Frontend
cd Frontend
npm install
npm run dev

Create .env:

VITE_BACKEND_URL=http://localhost:5001
Deployment

Frontend: Netlify
Backend: Render
Database: MongoDB Atlas

Future Improvements
Custom aliases
URL expiration
QR code generation
Redis caching
Rate limiting
Advanced analytics
Geographic analytics
Docker support
Author

Rudhar Gupta

GitHub: Rudhar-cmd

License

This project is created for learning and portfolio purposes.
