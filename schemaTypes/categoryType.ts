import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tileImage',
      title: 'Tile Image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'optionsKey',
      title: 'Options Key',
      description: 'Developer Only',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'filters',
      title: 'Filters',
      description: 'Developer Only',
      type: 'array',
      of: [{type: 'string'}],
      options: {list: ['company', 'style', 'size', 'container', 'region', 'year']},
      readOnly: true,
    }),
  ],
})
