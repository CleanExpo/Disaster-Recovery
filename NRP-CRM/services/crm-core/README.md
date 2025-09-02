# NRP CRM Core Microservice

A comprehensive, production-ready Node.js/Express microservice for the NRP Disaster Recovery CRM system. This service handles contractor management, territory operations, and real-time communications.

## 🚀 Features

- **Complete Contractor Management**: CRUD operations with full validation
- **Service Territory Management**: Postcode-based service area management
- **Performance Metrics**: Automated contractor performance tracking
- **Real-time WebSocket Support**: Live notifications and updates
- **JWT Authentication**: Secure API access with role-based authorization
- **PostgreSQL with Prisma ORM**: Type-safe database operations
- **Redis Caching**: High-performance data caching
- **Comprehensive Error Handling**: Production-ready error management
- **Security Hardened**: Rate limiting, CORS, security headers
- **Docker Ready**: Complete containerization with health checks
- **Comprehensive Logging**: Structured logging with rotation
- **API Documentation**: Built-in endpoint documentation

## 📋 Requirements

- Node.js 18.0.0 or higher
- PostgreSQL 12 or higher
- Redis 6 or higher (optional but recommended)
- Docker (optional)

## 🛠 Installation

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd NRP-CRM/services/crm-core

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev
```

### Docker Deployment

```bash
# Build Docker image
npm run docker:build

# Run with Docker
npm run docker:run

# Or use Docker Compose (from project root)
cd ../../
docker-compose up crm-core
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 3001 |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `REDIS_URL` | Redis connection string | redis://localhost:6379 |
| `JWT_SECRET` | JWT signing secret | - |
| `CORS_ORIGIN` | Allowed CORS origins | http://localhost:3000 |

See `.env.example` for complete configuration options.

### Database Setup

```bash
# Create and apply migrations
npm run prisma:migrate

# Open Prisma Studio for database exploration
npm run prisma:studio

# Seed database with sample data
npm run db:seed
```

## 🔌 API Endpoints

### Authentication Required

Most endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Contractor Management

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/v1/contractors` | Create new contractor | Yes |
| `GET` | `/api/v1/contractors` | List contractors | Yes |
| `GET` | `/api/v1/contractors/:id` | Get contractor by ID | Yes |
| `PUT` | `/api/v1/contractors/:id` | Update contractor | Yes |
| `DELETE` | `/api/v1/contractors/:id` | Delete contractor | Yes |
| `GET` | `/api/v1/contractors/me` | Get my profile | Contractor |
| `PUT` | `/api/v1/contractors/me` | Update my profile | Contractor |

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/contractors/search` | Search contractors |
| `GET` | `/api/v1/contractors/service-area/:postcode` | Find contractors by postcode |
| `GET` | `/api/v1/contractors/statistics` | Get contractor statistics |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/contractors/:id/verify` | Verify contractor |
| `POST` | `/api/v1/contractors/:id/approve` | Approve contractor |
| `POST` | `/api/v1/contractors/:id/suspend` | Suspend contractor |
| `PUT` | `/api/v1/contractors/:id/performance` | Update performance metrics |

### Health & Monitoring

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Basic health check |
| `GET` | `/health/detailed` | Detailed health with dependencies |
| `GET` | `/api/v1/docs` | API documentation |

## 📡 WebSocket Events

### Client Events

- `ping` - Connection health check
- `subscribe` - Subscribe to notification channels
- `unsubscribe` - Unsubscribe from channels
- `requestUpdate` - Request real-time data update
- `statusUpdate` - Update user status

### Server Events

- `connected` - Connection established
- `pong` - Ping response
- `notification` - General notifications
- `jobUpdate` - Job status updates
- `userStatusUpdate` - User online/offline status
- `serverShutdown` - Server shutdown notice

## 🏗 Architecture

### Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Request handlers
├── middleware/       # Express middleware
├── models/          # Prisma schema
├── routes/          # API route definitions
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── index.ts         # Application entry point
```

### Database Schema

- **Users**: Authentication and user management
- **Contractors**: Contractor profiles and business information
- **Services**: Service categories offered by contractors
- **Territories**: Geographic service areas
- **Performance Metrics**: Contractor performance tracking
- **Jobs**: Job/project management
- **Reviews**: Customer feedback and ratings

### Security Features

- JWT-based authentication with refresh tokens
- Role-based authorization (Admin, Manager, Contractor)
- Rate limiting (100 requests/15min per IP)
- Security headers (Helmet.js)
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- CORS protection
- Request size limits

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📊 Monitoring

### Logging

- Structured JSON logging with Winston
- Daily log rotation
- Different log levels for different environments
- Request/response logging
- Error tracking and alerting

### Metrics

- Performance metrics collection
- WebSocket connection monitoring
- Database query performance
- Cache hit/miss rates
- API endpoint usage statistics

### Health Checks

- `/health` - Basic service health
- `/health/detailed` - Service dependencies health
- Docker health check support
- Database connectivity monitoring
- Redis connectivity monitoring

## 🐳 Docker

### Build Image

```bash
docker build -t nrp-crm-core .
```

### Run Container

```bash
docker run -d \
  --name nrp-crm-core \
  -p 3001:3001 \
  -e DATABASE_URL="your-database-url" \
  -e REDIS_URL="your-redis-url" \
  -e JWT_SECRET="your-jwt-secret" \
  nrp-crm-core
```

### Docker Compose

See project root `docker-compose.yml` for complete stack deployment.

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure secure JWT secrets
- [ ] Setup SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Setup monitoring and alerting
- [ ] Configure log aggregation
- [ ] Setup database backups
- [ ] Configure auto-scaling (if using cloud)

### Environment-specific Configuration

#### Development
- Detailed error messages
- Debug logging enabled
- Hot reload support
- Mock external services

#### Production
- Error messages sanitized
- Optimized logging levels
- Security hardening enabled
- Performance monitoring active

## 🔧 Performance Optimization

### Caching Strategy

- Redis for session data and frequently accessed data
- 5-minute TTL for contractor data
- 10-minute TTL for statistics
- Cache invalidation on data updates

### Database Optimization

- Connection pooling
- Query optimization with indexes
- Read replicas for scaling (future)
- Regular maintenance tasks

### API Performance

- Response compression (gzip)
- Request/response size limits
- Efficient pagination
- Query result limiting

## 🛡 Security

### Authentication & Authorization

- JWT tokens with expiration
- Refresh token rotation
- Role-based access control
- Token blacklisting on logout

### Data Protection

- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting

### Infrastructure Security

- Security headers
- HTTPS enforcement (production)
- Secure cookie settings
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation at `/api/v1/docs`

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
  - Contractor CRUD operations
  - JWT authentication
  - WebSocket support
  - Performance metrics
  - Territory management