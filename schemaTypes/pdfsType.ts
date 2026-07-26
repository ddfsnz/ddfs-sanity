import {defineField, defineType} from 'sanity'

export const pdfsType = defineType({
  name: 'pdfs',
  title: 'PDF',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Name used in the website footer.',
    }),
    defineField({
      name: 'file',
      title: 'PDF',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Cannot be changed.',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
