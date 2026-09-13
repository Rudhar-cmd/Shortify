# Shortify

Shortify is a full-stack URL shortening application that allows users to convert long URLs into short, shareable links. It also provides authentication, URL management, click tracking, and analytics.

## Features

- User Registration and Login
- JWT-based Authentication
- Secure HTTP-only Cookies
- Create Short URLs
- Custom short codes
- Redirect short URLs to original URLs
- Track total clicks
- Track individual click details
- View URL analytics
- View browser/user-agent information
- View referrer information
- View click timestamps
- Update existing URLs
- Delete URLs
- View all URLs created by the authenticated user
- Protected routes
- Responsive frontend
- RESTful API architecture

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- CORS

### Deployment

- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```text
Shortify/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controller/
│   │   │   ├── user.controller.js
│   │   │   ├── url.controller.js
│   │   │   └── analytics.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── user.models.js
│   │   │   ├── url.models.js
│   │   │   └── click.models.js
│   │   │
│   │   ├── routes/
│   │   │   ├── user.routes.js
│   │   │   ├── url.routes.js
│   │   │   └── analytics.routes.js
│   │   │
│   │   ├── app.js
│   │   └── index.js
│   │
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MyLinks.jsx
│   │   │   └── Analytics.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── public/
│   │   └── _redirects
│   │
│   └── package.json
│
└── README.md
How It Works

The application follows a simple URL shortening flow.

User
  |
  v
React Frontend
  |
  v
Express REST API
  |
  v
MongoDB

When a user creates a short URL:

Long URL
   |
   v
POST /api/v1/url/shorten
   |
   v
Generate Short Code
   |
   v
Store URL in MongoDB
   |
   v
Return Short URL

When someone opens the short URL:

Short URL
   |
   v
GET /:shortCode
   |
   v
Find shortCode in MongoDB
   |
   v
Record Click
   |
   v
Redirect to Original URL
URL Data Model

Each shortened URL contains information such as:

user
originalUrl
shortCode
clicks
createdAt
updatedAt

The shortCode is used to identify the original URL.

For example:

https://shortify-i7wm.onrender.com/MQKyZB

The backend extracts:

MQKyZB

and searches MongoDB:

Url.findOne({ shortCode })

After finding the URL, the user is redirected to:

res.redirect(url.originalUrl)
Click Analytics

Shortify stores information about every click.

The click record contains:

url
ip
userAgent
referrer
clickedAt

The backend obtains these values from the HTTP request.

For example:

const ip = req.ip;
const userAgent = req.get("user-agent");
const referrer = req.get("referer");

This information can be used to understand how users interact with shortened links.

Authentication

Shortify uses JWT-based authentication.

The authentication flow is:

Register
   |
   v
Login
   |
   v
Generate Access Token
   |
   v
Store Token in HTTP-only Cookie
   |
   v
Protected Request
   |
   v
JWT Middleware
   |
   v
Verify Token
   |
   v
Access Protected Controller

Protected operations include:

Creating URLs
Viewing personal URLs
Updating URLs
Deleting URLs
Viewing analytics
API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/v1/users/register	Register a new user
POST	/api/v1/users/login	Login user
POST	/api/v1/users/logout	Logout user
GET	/api/v1/users/current-user	Get current user
URL Management
Method	Endpoint	Description
POST	/api/v1/url/shorten	Create a short URL
GET	/api/v1/url/my-urls	Get user's URLs
GET	/api/v1/url/:id	Get a specific URL
PATCH	/api/v1/url/:id	Update a URL
DELETE	/api/v1/url/:id	Delete a URL
Public Redirect
Method	Endpoint	Description
GET	/:shortCode	Redirect to original URL

Example:

GET https://shortify-i7wm.onrender.com/MQKyZB
Analytics API
Method	Endpoint	Description
GET	/api/v1/analytics/:id	Get analytics for a URL

The analytics response contains:

{
  "totalClicks": 10,
  "clicks": []
}

Each click contains information such as:

{
  "ip": "...",
  "userAgent": "...",
  "referrer": "...",
  "clickedAt": "..."
}
Installation
1. Clone the Repository
git clone <your-github-repository-url>
cd Shortify
2. Backend Setup
cd Backend
npm install

Create a .env file:

MONGO_URL=your_mongodb_connection_string
PORT=5001

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

Start the backend:

npm run dev

The backend will run on:

http://localhost:5001
3. Frontend Setup

Open another terminal:

cd Frontend
npm install

Create a .env file:

VITE_BACKEND_URL=http://localhost:5001

Start the frontend:

npm run dev

The frontend will run on the Vite development server.

Environment Variables
Backend
MONGO_URL=
PORT=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
Frontend
VITE_BACKEND_URL=

Never commit .env files containing secrets to GitHub.

Security

The application implements several security practices:

Password hashing using bcrypt
JWT authentication
HTTP-only authentication cookies
Protected API routes
User ownership verification
Environment variables for secrets
CORS configuration
Frontend Pages
Login

Allows users to authenticate using their account credentials.

Register

Allows new users to create an account.

Dashboard

Provides the main URL shortening interface.

Users can enter a long URL and generate a short URL.

My Links

Displays URLs created by the authenticated user.

Users can:

Copy short URLs
Open short URLs
Update URLs
Delete URLs
View analytics
Analytics

Displays click information for a selected shortened URL.

Deployment

The frontend can be deployed using Netlify.

The backend can be deployed using Render.

MongoDB can be hosted using MongoDB Atlas.

Production frontend environment variable:

VITE_BACKEND_URL=https://shortify-i7wm.onrender.com
Future Improvements

Possible improvements for future versions:

Custom aliases
URL expiration
QR code generation
Redis caching
Rate limiting
Advanced analytics
Browser and device parsing
Geographic analytics
Click charts and graphs
Link status management
Scheduled URL expiration
API documentation
Docker support
Admin dashboard
Learning Outcomes

This project helped implement and understand:

REST API development
Express.js architecture
MongoDB and Mongoose
JWT authentication
Middleware
HTTP-only cookies
Protected routes
URL redirection
Database relationships
Click tracking
HTTP request headers
Analytics
React Router
Axios
Environment variables
CORS
Full-stack deployment
Author

Rudhar Gupta

GitHub: Rudhar-cmd

License

This project is created for learning and portfolio purposes.


For GitHub, save this as:

```text
README.md

in the root Shortify folder, alongside Backend and Frontend.
