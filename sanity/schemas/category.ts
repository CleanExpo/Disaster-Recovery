/**
 * Sanity Schema: Category
 *
 * Defines the schema for content categories in the CMS.
 */

import { defineType, defineField } from '@sanity/types'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Category name',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly version of the name',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Category description',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color for category badges (e.g., #FF5733)',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., flame, droplets, wind)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category should appear',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
})
