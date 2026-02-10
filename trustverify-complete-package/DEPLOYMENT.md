# TrustVerify Deployment Guide

## Quick Deployment Checklist

### Environment Setup
- [ ] Node.js 20+ installed
- [ ] PostgreSQL database provisioned
- [ ] Environment variables configured
- [ ] SSL certificates ready (production)
- [ ] SendGrid API key obtained

### Database Setup
```bash
# Install dependencies
npm install

# Setup database schema
npm run db:push

# Verify database connection
npm run db:check
```

### Environment Variables
Create `.env` file with:
```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database
PGHOST=localhost
PGPORT=5432
PGUSER=trustverify
PGPASSWORD=secure_password
PGDATABASE=trustverify_db

# Security
SESSION_SECRET=your-256-bit-secret-key-here
JWT_SECRET=your-jwt-secret-key

# Email Service
SENDGRID_API_KEY=your-sendgrid-api-key

# Application
NODE_ENV=production
PORT=5000
HOST=0.0.0.0
```

### Production Deployment
```bash
# Build application
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "trustverify" -- start
```

## Docker Deployment

### Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/trustverify
      - SESSION_SECRET=your-session-secret
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=trustverify
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

## Cloud Deployment Options

### Replit Deployment (Recommended)
1. Import this codebase to Replit
2. Configure environment variables in Secrets
3. Use "Deploy" button for automated deployment
4. Custom domain supported

### AWS Deployment
- **Compute**: AWS ECS or EC2
- **Database**: RDS PostgreSQL
- **Storage**: S3 for file uploads
- **CDN**: CloudFront
- **Load Balancer**: Application Load Balancer

### Google Cloud Platform
- **Compute**: Cloud Run or Compute Engine
- **Database**: Cloud SQL PostgreSQL
- **Storage**: Cloud Storage
- **CDN**: Cloud CDN

### Vercel + PlanetScale
- **Frontend**: Vercel deployment
- **Database**: PlanetScale MySQL
- **Edge Functions**: API routes

## Security Considerations

### SSL/TLS Configuration
- Use Let's Encrypt for free SSL certificates
- Configure HTTPS redirects
- Enable HSTS headers
- Implement proper cipher suites

### Firewall Rules
```bash
# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Allow SSH (change port if needed)
ufw allow 22/tcp

# Block all other incoming traffic
ufw --force enable
```

### Database Security
- Use connection pooling
- Enable SSL connections
- Configure proper user permissions
- Regular security updates
- Backup encryption

## Performance Optimization

### Caching Strategy
- Redis for session storage (production)
- CDN for static assets
- Database query optimization
- API response caching

### Load Balancing
```nginx
upstream trustverify {
    server 127.0.0.1:5000;
    server 127.0.0.1:5001;
    server 127.0.0.1:5002;
}

server {
    listen 80;
    server_name trustverify.com;
    
    location / {
        proxy_pass http://trustverify;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Monitoring Setup
- Application performance monitoring
- Error tracking and alerting
- Database performance monitoring
- Security event logging

## Backup and Recovery

### Database Backups
```bash
# Daily automated backup
0 2 * * * pg_dump $DATABASE_URL > /backups/trustverify_$(date +%Y%m%d).sql

# Weekly full backup with compression
0 1 * * 0 pg_dump $DATABASE_URL | gzip > /backups/weekly/trustverify_$(date +%Y%m%d).sql.gz
```

### File Backups
- Upload directory synchronization
- Configuration file backups
- Log file rotation and archival

## Scaling Considerations

### Horizontal Scaling
- Multiple application instances
- Load balancer configuration
- Session store externalization
- Database read replicas

### Vertical Scaling
- CPU and memory optimization
- Database connection tuning
- Cache optimization
- Asset optimization

## Health Checks

### Application Health
```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'connected' // Add DB check
  });
});
```

### Database Health
```bash
# Connection test
psql $DATABASE_URL -c "SELECT 1"

# Performance monitoring
psql $DATABASE_URL -c "SELECT * FROM pg_stat_activity"
```

## Troubleshooting

### Common Issues
1. **Database Connection Errors**
   - Verify DATABASE_URL format
   - Check network connectivity
   - Validate credentials

2. **Session Issues**
   - Ensure SESSION_SECRET is set
   - Check session table exists
   - Verify session cleanup

3. **Email Delivery Problems**
   - Validate SendGrid API key
   - Check email templates
   - Monitor delivery logs

### Log Analysis
```bash
# Application logs
tail -f logs/app.log

# Error logs
grep "ERROR" logs/app.log

# Performance monitoring
grep "slow query" logs/db.log
```

## Maintenance

### Regular Tasks
- Security updates (monthly)
- Database optimization (weekly)
- Log rotation (daily)
- Backup verification (weekly)
- Performance review (monthly)

### Update Process
1. Test in staging environment
2. Create database backup
3. Deploy during low-traffic hours
4. Monitor post-deployment
5. Rollback plan ready