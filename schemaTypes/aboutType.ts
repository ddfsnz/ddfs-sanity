import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about-ddfs',
  title: 'About DDFS',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
})
