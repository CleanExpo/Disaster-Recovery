/**
 * Sanity Studio Configuration
 *
 * Configuration for the Sanity CMS studio.
 * This file is used when running the Sanity Studio interface.
 */

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// Get project ID and dataset from environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Disaster Recovery NRPG',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // Studio customization
  studio: {
    components: {
      // You can add custom components here
    },
  },

  // Document actions
  document: {
    // Remove delete action for published documents
    actions: (prev, context) => {
      // Add custom actions if needed
      return prev
    },
  },
})
