import {defineField, defineType} from 'sanity'

export const companyType = defineType({
  name: 'company',
  title: 'Companies/Producers',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'reference',
      to: [{type: 'country'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Producer',
      description:
        'Display Featured Producer label and enable filtering for this Producer (e.g. WOTM).',
      type: 'boolean',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'Controls which products this Producer is applicable to.',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
  ],
})
