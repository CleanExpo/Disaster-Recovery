/**
 * Location Content Schema
 * Sanity CMS schema for location-specific SEO content
 *
 * Allows content editors to customise:
 * - City landing pages
 * - Suburb pages
 * - Service + location pages
 * - Local FAQs
 * - Local testimonials
 */

import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'locationContent',
  title: 'Location Content',
  type: 'document',
  groups: [
    { name: 'location', title: 'Location' },
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    // Location Identification
    defineField({
      name: 'locationType',
      title: 'Location Type',
      type: 'string',
      options: {
        list: [
          { title: 'City', value: 'city' },
          { title: 'Suburb', value: 'suburb' },
          { title: 'Region', value: 'region' },
        ],
      },
      group: 'location',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'location',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'citySlug',
      title: 'City Slug',
      type: 'slug',
      options: { source: 'city', maxLength: 96 },
      group: 'location',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'suburb',
      title: 'Suburb',
      type: 'string',
      group: 'location',
      hidden: ({ document }) => document?.locationType !== 'suburb',
    }),
    defineField({
      name: 'suburbSlug',
      title: 'Suburb Slug',
      type: 'slug',
      options: { source: 'suburb', maxLength: 96 },
      group: 'location',
      hidden: ({ document }) => document?.locationType !== 'suburb',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      options: {
        list: [
          { title: 'New South Wales', value: 'NSW' },
          { title: 'Victoria', value: 'VIC' },
          { title: 'Queensland', value: 'QLD' },
          { title: 'Western Australia', value: 'WA' },
          { title: 'South Australia', value: 'SA' },
          { title: 'Tasmania', value: 'TAS' },
          { title: 'Australian Capital Territory', value: 'ACT' },
          { title: 'Northern Territory', value: 'NT' },
        ],
      },
      group: 'location',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postcode',
      title: 'Postcode',
      type: 'string',
      group: 'location',
    }),

    // Service Association (optional)
    defineField({
      name: 'service',
      title: 'Service',
      description: 'Optional: Associate with a specific service for service+location pages',
      type: 'string',
      options: {
        list: [
          { title: 'Water Damage Restoration', value: 'water-damage' },
          { title: 'Fire & Smoke Restoration', value: 'fire-restoration' },
          { title: 'Mould Remediation', value: 'mold-remediation' },
          { title: 'Storm Damage', value: 'storm-damage' },
          { title: 'Flood Cleanup', value: 'flood-cleanup' },
          { title: 'Biohazard Cleanup', value: 'biohazard-cleanup' },
          { title: 'Sewage Cleanup', value: 'sewage-cleanup' },
          { title: 'Burst Pipe Repair', value: 'burst-pipe' },
        ],
      },
      group: 'location',
    }),

    // Content Fields
    defineField({
      name: 'headline',
      title: 'Headline',
      description: 'Override default H1 headline',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'localDescription',
      title: 'Local Description',
      description: 'Location-specific description highlighting local expertise',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'localExpertise',
      title: 'Local Expertise',
      description: 'Why we are the best choice in this area',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
    }),
    defineField({
      name: 'localStats',
      title: 'Local Statistics',
      type: 'object',
      fields: [
        { name: 'contractorsInArea', title: 'Contractors in Area', type: 'number' },
        { name: 'jobsCompleted', title: 'Jobs Completed', type: 'number' },
        { name: 'averageResponseMins', title: 'Average Response (mins)', type: 'number' },
        { name: 'satisfactionRate', title: 'Satisfaction Rate (%)', type: 'number' },
      ],
      group: 'content',
    }),

    // FAQs
    defineField({
      name: 'faqs',
      title: 'Local FAQs',
      description: 'Location-specific frequently asked questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
      group: 'content',
    }),

    // Testimonials
    defineField({
      name: 'testimonials',
      title: 'Local Testimonials',
      description: 'Testimonials from customers in this area',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Customer Name', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: (Rule) => Rule.required() },
            { name: 'suburb', title: 'Suburb', type: 'string' },
            { name: 'service', title: 'Service Used', type: 'string' },
            { name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
            { name: 'date', title: 'Date', type: 'date' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'suburb' },
          },
        },
      ],
      group: 'content',
    }),

    // SEO Fields
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override default meta title (max 60 chars)',
      validation: (Rule) => Rule.max(60),
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Override default meta description (max 160 chars)',
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'keywords',
      title: 'Additional Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'seo',
    }),

    // Media
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
        { name: 'caption', title: 'Caption', type: 'string' },
      ],
      group: 'media',
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      description: 'Local project photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
      group: 'media',
    }),
  ],

  // Preview configuration
  preview: {
    select: {
      city: 'city',
      suburb: 'suburb',
      state: 'state',
      locationType: 'locationType',
      service: 'service',
      media: 'heroImage',
    },
    prepare({ city, suburb, state, locationType, service, media }) {
      const location = locationType === 'suburb' ? `${suburb}, ${city}` : city;
      const subtitle = service ? `${state} - ${service}` : state;
      return {
        title: location,
        subtitle,
        media,
      };
    },
  },

  // Ordering
  orderings: [
    {
      title: 'City A-Z',
      name: 'cityAsc',
      by: [{ field: 'city', direction: 'asc' }],
    },
    {
      title: 'State',
      name: 'stateAsc',
      by: [
        { field: 'state', direction: 'asc' },
        { field: 'city', direction: 'asc' },
      ],
    },
  ],
});
