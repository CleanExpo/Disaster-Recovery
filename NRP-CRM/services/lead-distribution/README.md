# NRP Lead Distribution Service

Intelligent lead distribution microservice for the NRP CRM system. This service handles the automated routing of disaster recovery leads to appropriate contractors based on geographic proximity, membership tier priority, performance metrics, and availability.

## Features

### Intelligent Lead Routing
- **Geographic Matching**: Proximity-based contractor selection using Haversine formula
- **Priority Scoring**: Multi-factor algorithm considering:
  - Membership tier (Franchise > Enterprise > Professional > Foundation)
  - Performance metrics (rating, response time, completion rate)
  - Current workload and availability
  - Service type specialization
  - Emergency priority handling

### Distribution Methods
- **Sequential**: One-by-one distribution with delay
- **Parallel**: Simultaneous notification to all selected contractors
- **Tier-based**: Hierarchical distribution by membership tier

### Real-time Communication
- **WebSocket Integration**: Live updates for lead status changes
- **SMS Notifications**: Twilio-powered instant alerts
- **Email Notifications**: SendGrid-powered detailed notifications
- **Push Notifications**: Future mobile app support

### Advanced Features
- **Queue Management**: RabbitMQ-based message processing
- **Rate Limiting**: Redis-backed notification throttling
- **Auto-retry Logic**: Intelligent redistribution on declines
- **Fair Distribution**: Prevents lead monopolization
- **Analytics Dashboard**: Comprehensive distribution metrics
- **Caching Layer**: Redis-powered performance optimization

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │    │  Contractor     │    │   Admin         │
│                 │    │   Portal        │    │  Dashboard      │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          │              WebSocket Connections          │
          │                      │                      │
┌─────────▼──────────────────────▼──────────────────────▼───────┐
│                Lead Distribution Service                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │    REST     │ │  WebSocket  │ │     Background Jobs     │ │
│  │     API     │ │   Server    │ │   (Cron, Queue Proc)   │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└───────────────────────────┬───────────────────────────────────┘
                           │
    ┌──────────────────────┼──────────────────────┐
    │                      │                      │
┌───▼───┐           ┌──────▼──────┐        ┌─────▼─────┐
│MongoDB│           │  RabbitMQ   │        │   Redis   │
│       │           │   Queue     │        │  Cache    │
│ Leads │           │ Management  │        │Rate Limit │
└───────┘           └─────────────┘        └───────────┘
                           │
              ┌────────────┼────────────┐
              │                         │
      ┌───────▼───────┐         ┌───────▼───────┐
      │    Twilio     │         │   SendGrid    │
      │ SMS Service   │         │ Email Service │
      └───────────────┘         └───────────────┘
```

## Installation

### Prerequisites
- Node.js 18+ 
- MongoDB 4.4+
- Redis 6.0+
- RabbitMQ 3.8+

### Setup

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd lead-distribution
npm install
```

2. **Environment Configuration**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Database Setup**
```bash
# MongoDB should be running on localhost:27017
# Redis should be running on localhost:6379
# RabbitMQ should be running on localhost:5672
```

4. **Build and Start**
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | HTTP server port | `3003` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/nrp-leads` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `RABBITMQ_URL` | RabbitMQ connection string | `amqp://localhost:5672` |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | Required for SMS |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | Required for SMS |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | Required for SMS |
| `SENDGRID_API_KEY` | SendGrid API key | Required for email |
| `SENDGRID_FROM_EMAIL` | Sender email address | Required for email |
| `MAX_CONTRACTORS_PER_LEAD` | Maximum contractors to notify | `5` |
| `DISTRIBUTION_METHOD` | Distribution strategy | `tier-based` |
| `LEAD_EXPIRATION_MINUTES` | Lead expiry time | `60` |

### Distribution Configuration

```typescript
{
  maxContractorsPerLead: 5,           // Max contractors to notify
  distributionMethod: 'tier-based',   // 'sequential', 'parallel', 'tier-based'
  expirationMinutes: 60,              // Auto-expiry time
  autoRetryOnDecline: true,           // Retry when declined
  maxRetryAttempts: 3,               // Max retry attempts
  retryDelayMinutes: 15,             // Delay between retries
  tierDistributionRatio: {            // Tier-based distribution ratios
    franchise: 0.4,
    enterprise: 0.3,
    professional: 0.2,
    foundation: 0.1
  },
  emergencyDistributionConfig: {      // Emergency lead handling
    maxContractors: 10,
    radiusKm: 75,
    method: 'parallel'
  }
}
```

## API Endpoints

### Lead Management

#### Create Lead
```http
POST /api/leads
Content-Type: application/json

{
  "title": "Water damage restoration needed urgently",
  "description": "Major water damage from burst pipe in commercial office",
  "serviceType": ["WATER_DAMAGE", "MOULD_REMEDIATION"],
  "priority": "high",
  "propertyType": "commercial",
  "location": {
    "address": "123 Business St",
    "suburb": "Brisbane City",
    "city": "Brisbane",
    "state": "QLD",
    "postcode": "4000",
    "coordinates": {
      "latitude": -27.4698,
      "longitude": 153.0251
    }
  },
  "client": {
    "name": "John Smith",
    "email": "john@company.com",
    "phone": "+61400000000",
    "preferredContactMethod": "phone"
  },
  "estimatedValue": 15000,
  "isEmergency": true,
  "source": "website"
}
```

#### Distribute Lead
```http
POST /api/leads/{leadId}/distribute
Content-Type: application/json

{
  "maxContractorsPerLead": 5,
  "distributionMethod": "tier-based",
  "expirationMinutes": 60
}
```

#### Contractor Response
```http
POST /api/leads/{leadId}/respond
Content-Type: application/json

{
  "contractorId": "contractor-123",
  "response": "accepted",
  "estimatedArrivalTime": "2024-01-20T10:00:00Z",
  "notes": "Can start immediately"
}
```

#### Get Lead Status
```http
GET /api/leads/{leadId}/status
```

### Analytics

#### Dashboard Analytics
```http
GET /api/leads/analytics/dashboard?period=7d
```

## WebSocket Events

### Client Events (Emit)
- `joinLead(leadId)` - Join lead-specific room
- `leaveLead(leadId)` - Leave lead-specific room
- `joinContractor(contractorId)` - Join contractor room

### Server Events (Listen)
- `leadUpdate` - Lead status changes
- `newDistribution` - New lead distributed
- `contractorResponse` - Response received

```javascript
// Example client code
const socket = io('http://localhost:3003');

socket.emit('joinLead', 'LEAD-123');
socket.on('leadUpdate', (data) => {
  console.log('Lead update:', data);
});
```

## Queue Integration

### Message Types

1. **Lead Distribution Messages**
```typescript
{
  leadId: string;
  contractorIds: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'emergency';
  distributionMethod: 'sequential' | 'parallel' | 'tier-based';
  expirationTime: Date;
}
```

2. **Notification Messages**
```typescript
{
  type: 'sms' | 'email';
  recipient: { phone?: string; email?: string };
  content: { subject?: string; body: string };
  priority: number;
  trackingId: string;
}
```

3. **Lead Response Messages**
```typescript
{
  leadId: string;
  contractorId: string;
  response: 'accepted' | 'declined';
  responseTime: Date;
  reason?: string;
}
```

## Algorithms

### Geographic Matching
- **Haversine Formula**: Calculate distances between coordinates
- **Service Radius**: Respect contractor service boundaries
- **Distance Bands**: Group contractors by proximity rings
- **Travel Time Estimation**: Account for traffic and terrain

### Priority Scoring
Multi-factor algorithm with configurable weights:

```typescript
totalScore = 
  (membershipScore * 25%) +      // Tier priority
  (performanceScore * 20%) +     // Rating & completion rate
  (proximityScore * 15%) +       // Geographic distance
  (specializationScore * 15%) +  // Service type match
  (availabilityScore * 10%) +    // Current availability
  (workloadScore * 8%) +         // Current job count
  (responseTimeScore * 5%) +     // Historical response time
  (emergencyScore * 2%)          // Emergency job bonus
```

### Fair Distribution
- **Distribution History**: Track recent lead assignments
- **Tier Balancing**: Ensure opportunities for all membership tiers
- **Workload Balancing**: Consider current contractor capacity
- **Performance Adjustments**: Reward high-performing contractors

## Monitoring

### Health Checks
- `GET /health` - Service health status
- Database connectivity
- Queue connection status
- Notification service status

### Metrics
- Lead distribution rates
- Contractor response times
- Acceptance/decline ratios
- Geographic coverage
- Service performance

### Logging
- Structured JSON logging
- Error tracking
- Performance monitoring
- Audit trails

## Development

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # ESLint checking
npm run lint:fix     # Fix ESLint issues
```

### Testing
```bash
# Unit tests
npm run test

# Coverage report
npm run test:coverage

# Watch mode
npm run test:watch
```

## Docker Deployment

### Build Image
```bash
docker build -t nrp-lead-distribution .
```

### Run Container
```bash
docker run -d \
  --name lead-distribution \
  -p 3003:3003 \
  --env-file .env \
  nrp-lead-distribution
```

### Docker Compose
```yaml
version: '3.8'
services:
  lead-distribution:
    build: .
    ports:
      - "3003:3003"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/nrp-leads
      - REDIS_URL=redis://redis:6379
      - RABBITMQ_URL=amqp://rabbitmq:5672
    depends_on:
      - mongo
      - redis
      - rabbitmq
```

## Performance Considerations

### Scalability
- Horizontal scaling with load balancer
- Database sharding for high volume
- Redis clustering for distributed cache
- Queue partitioning for parallel processing

### Optimization
- Connection pooling for databases
- Caching frequently accessed data
- Batch processing for notifications
- Async processing for heavy operations

## Security

### Authentication
- JWT tokens for API access
- API keys for internal services
- Rate limiting to prevent abuse

### Data Protection
- Input validation and sanitization
- Encrypted communication (HTTPS/WSS)
- Secure environment variable handling
- Database access controls

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MongoDB service status
   - Verify connection string
   - Check network connectivity

2. **RabbitMQ Connection Failed**
   - Ensure RabbitMQ is running
   - Check credentials and permissions
   - Verify network connectivity

3. **SMS/Email Not Sending**
   - Check Twilio/SendGrid credentials
   - Verify API quotas and limits
   - Check phone/email formats

4. **WebSocket Connection Issues**
   - Check CORS configuration
   - Verify client connection code
   - Monitor server logs

### Debug Mode
```bash
LOG_LEVEL=debug npm run dev
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit pull request

## License

This project is proprietary to NRP Disaster Recovery. All rights reserved.

## Support

For technical support, contact the NRP Development Team at dev@nrp.com.au