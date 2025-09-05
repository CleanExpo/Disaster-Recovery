# Disaster Recovery Platform API Documentation

## Overview
This document provides comprehensive documentation for all API endpoints in the Disaster Recovery Platform. All endpoints use JSON for request and response bodies.

## Base URL
- Development: `http://localhost:3000`
- Production: `https://disaster-recovery-seven.vercel.app`

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Standard Response Format
All API responses follow this format:
```json
{
  "success": boolean,
  "data": object | array,
  "error": {
    "message": string,
    "code": string,
    "details": object
  },
  "meta": {
    "timestamp": string,
    "version": string
  }
}
```

## Error Codes
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `429` - Rate Limited
- `500` - Internal Server Error
- `503` - Service Unavailable

---

## Bot System API

### Send Message to Bot
**POST** `/api/bot/message`

Send a message to the AI bot system.

**Request:**
```json
{
  "message": "string",
  "sessionId": "string",
  "metadata": {
    "userAgent": "string",
    "location": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "string",
    "confidence": 0.95,
    "suggestedActions": [
      {
        "label": "string",
        "action": "string"
      }
    ]
  }
}
```

### Emergency Request
**POST** `/api/bot/emergency`

Submit an emergency disaster recovery request.

**Request:**
```json
{
  "situation": "string",
  "location": {
    "address": "string",
    "suburb": "string",
    "state": "string",
    "postcode": "string"
  },
  "contactInfo": {
    "name": "string",
    "phone": "string",
    "email": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "emergencyId": "string",
  "data": {
    "response": "string",
    "actions": ["string"],
    "priority": "IMMEDIATE",
    "estimatedResponse": "60 minutes"
  }
}
```

---

## Contractor API

### Get Jobs List
**GET** `/api/contractor/jobs`

Get list of jobs for the authenticated contractor.

**Query Parameters:**
- `status` - Filter by status (pending, active, completed, cancelled)
- `dateFrom` - Start date filter
- `dateTo` - End date filter
- `service` - Filter by service type
- `location` - Filter by location
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 20, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "JOB-2024-101",
        "customer": {
          "name": "string",
          "email": "string",
          "address": "string"
        },
        "service": {
          "type": "water-damage",
          "name": "Water Damage Restoration",
          "category": "emergency"
        },
        "status": "active",
        "priority": "high",
        "scheduledDate": "2024-01-29T14:00:00Z",
        "estimatedDuration": 3,
        "value": 3500.00,
        "insurance": {
          "hasInsurance": true,
          "company": "NRMA",
          "claimNumber": "CLM-2024-456",
          "excess": 500
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 47,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### Get Job Details
**GET** `/api/contractor/jobs/{id}`

Get detailed information about a specific job.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "JOB-2024-101",
    "customer": {
      "name": "string",
      "email": "string",
      "phone": "string",
      "address": "string"
    },
    "service": {
      "type": "string",
      "name": "string",
      "category": "string"
    },
    "status": "active",
    "progress": 45,
    "timeline": [
      {
        "status": "created",
        "timestamp": "2024-01-28T10:00:00Z",
        "notes": "Job created"
      }
    ],
    "equipment": ["string"],
    "team": ["string"],
    "notes": "string",
    "createdAt": "2024-01-28T10:00:00Z",
    "updatedAt": "2024-01-29T15:30:00Z"
  }
}
```

### Update Job
**PATCH** `/api/contractor/jobs/{id}`

Update job information.

**Request:**
```json
{
  "status": "completed",
  "notes": "string",
  "progress": 100,
  "completedAt": "2024-01-29T18:00:00Z"
}
```

### Accept/Decline Job
**POST** `/api/contractor/jobs`

Accept, decline, or complete a job.

**Request:**
```json
{
  "jobId": "JOB-2024-101",
  "action": "accept | decline | complete | update",
  "data": {
    "notes": "string"
  }
}
```

### Get Contractor Profile
**GET** `/api/contractor/profile`

Get the contractor's profile information.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "companyName": "Rapid Response Restoration",
    "contactName": "John Smith",
    "email": "john@example.com",
    "phone": "0412 345 678",
    "abn": "12 345 678 901",
    "address": "123 Industrial Dr, Eagle Farm, QLD 4009",
    "serviceRadius": 50,
    "services": ["Water Damage", "Fire Damage"],
    "availability": {
      "247": true,
      "emergencyResponse": true,
      "responseTime": 60
    },
    "insurance": {
      "publicLiability": true,
      "publicLiabilityAmount": 20000000,
      "professionalIndemnity": true,
      "workCover": true
    },
    "certifications": ["IICRC Water Damage"],
    "performance": {
      "totalJobs": 342,
      "completionRate": 98.5,
      "averageRating": 4.8,
      "responseTime": "45 minutes",
      "tier": "PLATINUM"
    },
    "status": "ACTIVE"
  }
}
```

### Update Contractor Profile
**PATCH** `/api/contractor/profile`

Update contractor profile information.

**Request:**
```json
{
  "companyName": "string",
  "contactName": "string",
  "email": "string",
  "phone": "string",
  "serviceRadius": 50,
  "services": ["string"],
  "availability": {
    "247": true,
    "emergencyResponse": true
  },
  "certifications": ["string"]
}
```

### Get Analytics
**GET** `/api/contractor/analytics`

Get contractor performance analytics.

**Query Parameters:**
- `period` - Time period (7d, 30d, 90d, 1y)
- `startDate` - Custom start date
- `endDate` - Custom end date

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalLeads": 47,
      "acceptedLeads": 42,
      "conversionRate": 89.4,
      "completedJobs": 38,
      "activeJobs": 4,
      "revenue": 156500.00,
      "averageJobValue": 4118.42,
      "rating": 4.8
    },
    "performance": {
      "responseTime": {
        "average": "45 minutes",
        "fastest": "12 minutes",
        "onTimeRate": 95.2
      }
    },
    "revenue": {
      "current": 156500.00,
      "previous": 142300.00,
      "growth": 10.0,
      "byCategory": [
        {
          "category": "Water Damage",
          "amount": 67500,
          "percentage": 43.1
        }
      ]
    },
    "trends": {
      "daily": [
        {
          "date": "2024-01-23",
          "leads": 6,
          "jobs": 5,
          "revenue": 21500
        }
      ]
    },
    "locations": {
      "topAreas": [
        {
          "suburb": "Brisbane CBD",
          "jobs": 12,
          "revenue": 48500
        }
      ]
    },
    "feedback": {
      "recent": [
        {
          "customer": "S. Johnson",
          "rating": 5,
          "comment": "Excellent service",
          "date": "2024-01-28"
        }
      ]
    }
  }
}
```

---

## Lead Management API

### Submit Lead
**POST** `/api/lead/submit`

Submit a new disaster recovery lead.

**Request:**
```json
{
  "fullName": "string",
  "phone": "string",
  "email": "string",
  "propertyType": "Residential | Commercial | Industrial",
  "propertyAddress": "string",
  "suburb": "string",
  "state": "string",
  "postcode": "string",
  "damageType": ["water", "fire", "mould", "storm"],
  "damageDate": "2024-01-25",
  "damageDescription": "string",
  "estimatedAreaAffected": "string",
  "hasInsurance": true,
  "insuranceCompany": "string",
  "claimNumber": "string",
  "urgencyLevel": "IMMEDIATE | HIGH | MEDIUM | LOW",
  "hasPhotos": true,
  "readyToStart": "IMMEDIATELY | WITHIN_24_HOURS | WITHIN_WEEK | FLEXIBLE",
  "decisionMaker": true,
  "additionalNotes": "string"
}
```

### Validate Lead
**POST** `/api/lead/validate`

Validate lead data before submission.

**Request:** Same as Submit Lead

**Response:**
```json
{
  "success": true,
  "data": {
    "isValid": true,
    "isDuplicate": false,
    "leadScore": 85,
    "leadValue": 3500,
    "qualityStatus": "HIGH_VALUE"
  }
}
```

---

## Authentication API

### Login
**POST** `/api/auth/login`

Authenticate user and receive JWT token.

**Request:**
```json
{
  "email": "string",
  "password": "string",
  "role": "contractor | admin | customer"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "string",
      "email": "string",
      "role": "contractor",
      "name": "string"
    },
    "expiresIn": 86400
  }
}
```

### Refresh Token
**POST** `/api/auth/refresh`

Refresh an expired JWT token.

**Request:**
```json
{
  "refreshToken": "string"
}
```

### Logout
**POST** `/api/auth/logout`

Logout and invalidate token.

---

## Rate Limiting

All API endpoints are rate limited to prevent abuse:

- **Default limit**: 100 requests per minute per IP
- **Authenticated limit**: 1000 requests per minute per user
- **Bot endpoints**: 30 requests per minute per session

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1643723400
```

---

## Webhooks

The platform can send webhooks for the following events:

### Lead Assignment
```json
{
  "event": "lead.assigned",
  "timestamp": "2024-01-29T10:00:00Z",
  "data": {
    "leadId": "string",
    "contractorId": "string",
    "urgency": "IMMEDIATE"
  }
}
```

### Job Status Update
```json
{
  "event": "job.status_changed",
  "timestamp": "2024-01-29T10:00:00Z",
  "data": {
    "jobId": "string",
    "previousStatus": "pending",
    "newStatus": "active",
    "contractorId": "string"
  }
}
```

---

## Testing

Use the following tools to test the API:

### cURL Examples

Get contractor jobs:
```bash
curl -X GET "http://localhost:3000/api/contractor/jobs" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Submit a lead:
```bash
curl -X POST "http://localhost:3000/api/lead/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "phone": "0412345678",
    "email": "john@example.com",
    "propertyType": "Residential",
    "propertyAddress": "123 Main St",
    "suburb": "Brisbane",
    "state": "QLD",
    "postcode": "4000",
    "damageType": ["water"],
    "urgencyLevel": "HIGH"
  }'
```

### Postman Collection

Import the Postman collection from `/docs/postman-collection.json` for a complete set of pre-configured requests.

---

## Status Codes Reference

| Code | Description | Use Case |
|------|-------------|----------|
| 200 | OK | Successful GET, PATCH |
| 201 | Created | Successful POST creating resource |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Valid auth but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Temporary outage |

---

## Support

For API support or to report issues:
- GitHub Issues: https://github.com/disaster-recovery/platform/issues
- Documentation: https://disaster-recovery-seven.vercel.app/docs

---

Last Updated: January 2024