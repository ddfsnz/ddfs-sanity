import {defineField, defineType} from 'sanity'

export const countryType = defineType({
  name: 'country',
  title: 'Countries',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
