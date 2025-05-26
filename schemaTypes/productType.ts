import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Updated automatically from Xero',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (excl. GST)',
      description: 'Updated automatically from Xero',
      type: 'number',
      readOnly: true,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      description: 'Updated automatically from Xero',
      type: 'number',
      readOnly: true,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      description: 'Updated automatically from Xero',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
  ],
})
