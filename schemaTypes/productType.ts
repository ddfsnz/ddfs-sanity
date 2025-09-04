import {defineField, defineType, SanityDocument} from 'sanity'

interface TagDocument extends SanityDocument {
  category?: {
    _ref: string
    _type: 'reference'
  }
}

export const productType = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Style',
      type: 'reference',
      to: [{type: 'tag'}],
      validation: (rule) => rule.required(),
      options: {
        filter: ({document}: {document: TagDocument}) => {
          if (!document?.category?._ref) {
            return {
              filter: 'category._ref == $categoryRef',
              params: {categoryRef: null},
            }
          }
          return {
            filter: 'category._ref == $categoryRef',
            params: {categoryRef: document.category._ref},
          }
        },
      },
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'reference',
      to: [{type: 'country'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clearance',
      title: 'On Clearance',
      type: 'boolean',
      initialValue: false,
    }),
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
