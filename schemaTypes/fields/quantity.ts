import {defineField} from 'sanity'

export const quantityField = defineField({
  name: 'quantity',
  title: 'Quantity Options',
  type: 'array',
  of: [{type: 'number'}],
  validation: (rule) => rule.required(),
})
