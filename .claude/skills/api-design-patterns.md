# API Design Patterns

**Skill ID**: api-design-patterns
**Version**: 1.0.0

## RESTful Conventions

- GET /api/bookings - List all
- GET /api/bookings/[id] - Get one
- POST /api/bookings - Create
- PATCH /api/bookings/[id] - Update
- DELETE /api/bookings/[id] - Delete

## Response Format

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}

// Error
{
  "success": false,
  "error": "Error message",
  "details": { ... }
}
```

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Load when designing or implementing API endpoints.
