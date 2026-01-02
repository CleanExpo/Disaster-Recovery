/**
 * Sanity Revalidation API Route
 *
 * This endpoint is called by Sanity webhooks to trigger on-demand revalidation
 * when content is updated in the CMS.
 *
 * Setup Instructions:
 * 1. Go to Sanity Studio -> API -> Webhooks
 * 2. Create a new webhook with:
 *    - URL: https://your-domain.com/api/revalidate
 *    - Dataset: production (or your dataset)
 *    - Trigger on: Create, Update, Delete
 *    - Secret: Set a secret token (use SANITY_REVALIDATE_SECRET env var)
 * 3. Add the secret to your .env.local file
 */

import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Type definitions for Sanity webhook payload
interface SanityWebhookBody {
  _type: string
  _id: string
  slug?: {
    current: string
  }
  category?: {
    _ref: string
  }
}

/**
 * POST /api/revalidate
 *
 * Handles revalidation requests from Sanity webhooks
 */
export async function POST(req: NextRequest) {
  try {
    // Verify the request is from Sanity using the secret token
    const signature = req.headers.get('sanity-webhook-signature')
    const secret = process.env.SANITY_REVALIDATE_SECRET

    if (!secret) {
      console.error('SANITY_REVALIDATE_SECRET is not set')
      return NextResponse.json(
        { message: 'Revalidation secret not configured' },
        { status: 500 }
      )
    }

    // Parse and validate the webhook body
    const body = await parseBody<SanityWebhookBody>(
      await req.text(),
      signature || '',
      secret
    )

    if (!body?._type) {
      return NextResponse.json(
        { message: 'Invalid webhook payload' },
        { status: 400 }
      )
    }

    // Log the revalidation request
    console.log('Revalidation triggered for:', {
      type: body._type,
      id: body._id,
      slug: body.slug?.current,
    })

    // Revalidate based on content type
    await revalidateContent(body)

    // Return success response
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: body._type,
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * Revalidate content based on type
 */
async function revalidateContent(body: SanityWebhookBody) {
  const { _type, slug, category } = body

  // Revalidate homepage (always, as it shows featured content)
  await revalidatePath('/', 'page')

  switch (_type) {
    case 'blogPost':
      // Revalidate blog listing pages
      await revalidatePath('/resources', 'page')

      // Revalidate specific blog post if slug is available
      if (slug?.current) {
        await revalidatePath(`/resources/${slug.current}`, 'page')
      }

      // Revalidate category page if category is specified
      if (category?._ref) {
        await revalidateTag(`category-${category._ref}`)
      }
      break

    case 'guide':
      // Revalidate guides listing
      await revalidatePath('/guides', 'page')

      // Revalidate specific guide if slug is available
      if (slug?.current) {
        await revalidatePath(`/guides/${slug.current}`, 'page')
      }

      // Revalidate category page if category is specified
      if (category?._ref) {
        await revalidateTag(`category-${category._ref}`)
      }
      break

    case 'resource':
      // Revalidate resources listing
      await revalidatePath('/resources', 'page')

      // Revalidate specific resource if slug is available
      if (slug?.current) {
        await revalidatePath(`/resources/${slug.current}`, 'page')
      }

      // Revalidate category page if category is specified
      if (category?._ref) {
        await revalidateTag(`category-${category._ref}`)
      }
      break

    case 'faq':
      // Revalidate all pages with FAQs
      await revalidatePath('/faq', 'page')
      await revalidateTag('faqs')
      break

    case 'category':
      // Revalidate all content when a category changes
      await revalidatePath('/resources', 'page')
      await revalidatePath('/guides', 'page')

      // Revalidate specific category page if slug is available
      if (slug?.current) {
        await revalidatePath(`/resources/${slug.current}`, 'page')
        await revalidateTag(`category-${body._id}`)
      }
      break

    case 'author':
      // Revalidate all blog posts when an author changes
      await revalidatePath('/resources', 'page')
      break

    default:
      console.log(`No specific revalidation for type: ${_type}`)
  }
}

/**
 * GET /api/revalidate
 *
 * Manual revalidation endpoint (for testing or manual triggers)
 * Requires authentication via secret token
 */
export async function GET(req: NextRequest) {
  try {
    // Check for authentication
    const authHeader = req.headers.get('authorization')
    const secret = process.env.SANITY_REVALIDATE_SECRET

    if (!authHeader || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get path to revalidate from query params
    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path')
    const tag = searchParams.get('tag')

    if (!path && !tag) {
      return NextResponse.json(
        { message: 'Missing path or tag parameter' },
        { status: 400 }
      )
    }

    // Revalidate
    if (path) {
      await revalidatePath(path, 'page')
      console.log(`Manual revalidation: ${path}`)
    }

    if (tag) {
      await revalidateTag(tag)
      console.log(`Manual revalidation tag: ${tag}`)
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path,
      tag,
    })
  } catch (err) {
    console.error('Manual revalidation error:', err)
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
