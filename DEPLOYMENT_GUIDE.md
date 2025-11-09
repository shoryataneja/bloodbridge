# BloodBridge Deployment Guide

## Prerequisites
- Node.js 18+ installed
- MySQL database (local or cloud)
- Cloudinary account (for image uploads)

## Backend Deployment (Render)

### 1. Database Setup
1. Create a MySQL database on Render or use external service like PlanetScale
2. Note the connection string

### 2. Environment Variables
Set these in Render dashboard:
```
NODE_ENV=production
DATABASE_URL=mysql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-change-in-production
FRONTEND_URL=https://your-frontend-domain.com
PORT=10000
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 3. Deploy to Render
1. Connect your GitHub repository
2. Use the provided `render.yaml` configuration
3. Set build command: `npm install && npx prisma generate && npx prisma migrate deploy`
4. Set start command: `npm start`

## Frontend Deployment (Netlify/Vercel)

### 1. Environment Variables
Set in deployment platform:
```
VITE_API_URL=https://your-backend-domain.onrender.com
VITE_APP_NAME=BloodBridge
VITE_APP_VERSION=1.0.0
```

### 2. Build Settings
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18

### 3. Redirects
The `netlify.toml` file is already configured for SPA routing.

## Database Migration
After backend deployment, run:
```bash
npx prisma migrate deploy
```

## Post-Deployment Checklist
- [ ] Test user registration/login
- [ ] Test blood request creation
- [ ] Test donation queue functionality
- [ ] Test image uploads
- [ ] Test responsive design on mobile
- [ ] Verify all API endpoints work
- [ ] Check error handling
- [ ] Test performance

## Monitoring
- Set up health check monitoring for `/health` endpoint
- Monitor database connections
- Set up error logging service (optional)

## Security Notes
- JWT secrets are auto-generated in production
- CORS is configured for production domains
- Security headers are enabled
- Input validation is in place

## Troubleshooting
- Check environment variables are set correctly
- Verify database connection string
- Ensure Prisma migrations are applied
- Check CORS configuration for frontend domain