# Render Deployment Guide

## Quick Deploy to Render

### 1. Connect Repository
- Go to [Render Dashboard](https://dashboard.render.com)
- Click "New" → "Blueprint"
- Connect your GitHub repository: `shoryataneja/bloodbridge`

### 2. Environment Variables (Set in Render Dashboard)
**Backend Service:**
```
NODE_ENV=production
DATABASE_URL=postgresql://postgres.ujtqekcnngoikrzkhsmc:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.ujtqekcnngoikrzkhsmc:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
JWT_SECRET=[Auto-generated]
FRONTEND_URL=https://bloodbridge-frontend.onrender.com
PORT=10000
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

**Frontend Service:**
```
VITE_API_URL=https://bloodbridge-backend.onrender.com
```

### 3. Deploy
The `render.yaml` file will automatically:
- Create MySQL database
- Deploy backend Node.js service
- Deploy frontend static site
- Configure all connections

### 4. Post-Deployment
1. Run database migrations via Render shell:
   ```bash
   npx prisma migrate deploy
   ```

2. Test the application:
   - Backend: `https://bloodbridge-backend.onrender.com/health`
   - Frontend: `https://bloodbridge-frontend.onrender.com`

### Services Created:
- **bloodbridge-backend**: Node.js API server
- **bloodbridge-frontend**: Static React app
- **Database**: Supabase PostgreSQL (external)

Both services will be deployed on Render's free tier with Supabase database.