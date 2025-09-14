import {defineField} from 'sanity'

export const containerField = defineField({
  name: 'container',
  title: 'Container',
  type: 'string',
  options: {
    list: ['Cans', 'Bottles'],
  },
  validation: (rule) => rule.required(),
})
