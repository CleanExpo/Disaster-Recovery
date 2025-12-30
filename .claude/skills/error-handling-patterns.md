# Error Handling Patterns

**Skill ID**: error-handling-patterns
**Version**: 1.0.0

## Service Layer

```typescript
async function createBooking(input: BookingCreateInput): Promise<Booking> {
  try {
    logger.info('Creating booking', { input })
    const booking = await prisma.booking.create({ data: input })
    logger.info('Booking created', { bookingId: booking.id })
    return booking
  } catch (error) {
    logger.error('Failed to create booking', { error, input })

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new Error('Booking already exists')
    }

    throw new Error('Failed to create booking')
  }
}
```

## API Layer

```typescript
export async function POST(request: NextRequest) {
  try {
    const input = await request.json()
    const validated = BookingCreateSchema.parse(input)
    const booking = await createBooking(validated)
    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

Load when implementing error handling.
