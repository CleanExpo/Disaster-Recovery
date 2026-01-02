/**
 * Sanity Schema: FAQ
 *
 * Defines the schema for Frequently Asked Questions in the CMS.
 * Used for location pages and general help content.
 */

import { defineType, defineField } from '@sanity/types'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(200),
      description: 'The question being asked',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
      description: 'The answer to the question',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
      description: 'FAQ category (e.g., General, Insurance, Restoration)',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Specific location this FAQ applies to (e.g., "Los Angeles", "California")',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Keywords for search and filtering',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this FAQ should appear (lower numbers first)',
      initialValue: 100,
    }),
    defineField({
      name: 'relatedFaqs',
      title: 'Related FAQs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faq' }],
        },
      ],
      description: 'Other FAQs that might be helpful',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display this FAQ prominently',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      description: 'When this FAQ was published',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When this FAQ was last updated',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category.name',
      location: 'location',
    },
    prepare(selection) {
      const { category, location } = selection
      const subtitle = location ? `${category} - ${location}` : category
      return {
        ...selection,
        subtitle,
      }
    },
  },
})
