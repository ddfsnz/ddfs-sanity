import {defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {
              title: 'Heading 1',
              value: 'h2',
            },
            {
              title: 'Heading 2',
              value: 'h3',
            },
            {
              title: 'Heading 3',
              value: 'h4',
            },
            {
              title: 'Heading 4',
              value: 'h5',
            },
            {
              title: 'Heading 5',
              value: 'h6',
            },
          ],
        },
      ],
    }),
  ],
})
