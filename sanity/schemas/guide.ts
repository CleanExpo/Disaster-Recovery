/**
 * Sanity Schema: Guide
 *
 * Defines the schema for disaster recovery guides in the CMS.
 * Includes step-by-step instructions, difficulty levels, and downloadable resources.
 */

import { defineType, defineField } from '@sanity/types'

export default defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(100),
      description: 'The main title of the guide',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly version of the title',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
      description: 'Guide category (e.g., Fire Damage, Flood Recovery)',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description: 'Complexity level of this guide',
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Estimated Time',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'How long it takes to complete (e.g., "30 minutes", "2 hours")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(100).max(300),
      description: 'Overview of what this guide covers',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
      description: 'Main image for the guide',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'step',
          title: 'Step',
          fields: [
            {
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Step Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                },
              ],
            },
            {
              name: 'tips',
              title: 'Tips',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Helpful tips for this step',
            },
            {
              name: 'warnings',
              title: 'Warnings',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Important warnings or cautions',
            },
          ],
          preview: {
            select: {
              title: 'title',
              stepNumber: 'stepNumber',
            },
            prepare(selection) {
              return {
                title: `Step ${selection.stepNumber}: ${selection.title}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Step-by-step instructions',
    }),
    defineField({
      name: 'downloads',
      title: 'Downloadable Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'download',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'fileType',
              title: 'File Type',
              type: 'string',
              options: {
                list: [
                  { title: 'PDF', value: 'pdf' },
                  { title: 'Word Document', value: 'doc' },
                  { title: 'Excel Spreadsheet', value: 'xls' },
                  { title: 'Checklist', value: 'checklist' },
                  { title: 'Template', value: 'template' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              fileType: 'fileType',
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle: selection.fileType?.toUpperCase() || 'File',
              }
            },
          },
        },
      ],
      description: 'Files users can download',
    }),
    defineField({
      name: 'requiredTools',
      title: 'Required Tools',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tools or materials needed to complete this guide',
    }),
    defineField({
      name: 'relatedGuides',
      title: 'Related Guides',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'guide' }],
        },
      ],
      description: 'Other guides that might be helpful',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      description: 'When this guide was published',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When this guide was last updated',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Guide',
      type: 'boolean',
      description: 'Display this guide prominently',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.name',
      difficulty: 'difficulty',
      media: 'featuredImage',
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: `${selection.category} - ${selection.difficulty}`,
      }
    },
  },
})
