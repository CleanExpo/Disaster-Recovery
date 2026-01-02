/**
 * Sanity Schema Index
 *
 * Exports all schema definitions for the Sanity CMS.
 */

import author from './author'
import category from './category'
import blogPost from './blogPost'
import guide from './guide'
import resource from './resource'
import faq from './faq'
import locationContent from './locationContent'

export const schemaTypes = [
  // Supporting schemas
  author,
  category,

  // Content schemas
  blogPost,
  guide,
  resource,
  faq,

  // SEO/Location schemas
  locationContent,
]
