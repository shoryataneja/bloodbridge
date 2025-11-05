# BloodBridge - Blood Donation Management Platform

A minimalistic, trustworthy blood donation and request management platform that connects donors with those in need.

## Features

- **User Authentication**: Secure JWT-based authentication
- **Blood Requests**: Create and manage blood donation requests
- **Donation Queue**: Join queues for specific blood requests
- **Certificate Generation**: Digital certificates for donors
- **Real-time Updates**: Live status updates for requests
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Backend
- Node.js + Express
- MySQL + Prisma ORM
- JWT Authentication
- bcrypt for password hashing
- PDFKit for certificate generation

### Frontend
- React + Vite
- TailwindCSS
- React Router
- Axios for API calls
- Context API for state management

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Update the `.env` file with your database URL and JWT secret.

4. Run database migrations:
```bash
npm run migrate
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="mysql://username:password@localhost:3306/bloodbridge"
JWT_SECRET="your-super-secret-jwt-key"
FRONTEND_URL="http://localhost:5173"
PORT=3000
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - User login

### Requests
- `POST /requests/create` - Create blood request
- `GET /requests` - Get all active requests
- `GET /requests/:id` - Get request details
- `POST /requests/:id/join` - Join donation queue
- `DELETE /requests/:id/leave` - Leave donation queue
- `POST /requests/:id/complete` - Mark request as completed

### Users
- `GET /users/:id/history` - Get user donation/request history

## Database Schema

### User
- id, name, email, password, bloodGroup, city, role, createdAt

### Request
- id, requesterId, bloodGroup, unitsNeeded, location, message, status, createdAt

### DonationQueue
- id, requestId, donorId, joinedAt

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Set start command: `npm start`
3. Configure environment variables

### Database (PlanetScale/Railway)
1. Create a MySQL database
2. Update DATABASE_URL in environment variables
3. Run migrations in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details