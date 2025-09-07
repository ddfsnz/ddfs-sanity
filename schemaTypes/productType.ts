import {defineField, defineType, SanityDocument} from 'sanity'
import {
  BEERS_CATEGORY_ID,
  CIDERS_CATEGORY_ID,
  LIQUERS_CATEGORY_ID,
  PORT_CATEGORY_ID,
  SPIRITS_CATEGORY_ID,
  WINES_CATEGORY_ID,
} from './_constants'
import {DollarInput} from '../components/DollarInput'
import {PercentInput} from '../components/PercentInput'

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
      name: 'price',
      title: 'Price (excl. GST)',
      description: 'Updated automatically from Xero',
      type: 'number',
      readOnly: true,
      validation: (rule) => rule.required().min(0),
      components: {
        input: DollarInput,
      },
    }),
    defineField({
      name: 'deal',
      title: 'Deal',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Deal Price',
          type: 'boolean',
        }),
        defineField({
          name: 'price',
          title: 'Deal Price (excl. GST)',
          description: 'Price (per item) for the deal.',
          type: 'number',
          components: {
            input: DollarInput,
          },
          validation: (rule) => rule.min(0),
          hidden: ({parent}) => parent?.enabled !== true,
        }),
        defineField({
          name: 'quantity',
          title: 'Deal Quantity',
          description: 'Number of items required to trigger the deal price.',
          type: 'number',
          validation: (rule) => rule.integer().min(1),
          hidden: ({parent}) => parent?.enabled !== true,
        }),
      ],
    }),
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
      name: 'abv',
      title: 'Strength (ABV)',
      type: 'number',
      components: {
        input: PercentInput,
      },
      validation: (rule) => rule.required().min(0),
      hidden: ({document}: {document: TagDocument | undefined}) => {
        const validCategories = [
          BEERS_CATEGORY_ID,
          CIDERS_CATEGORY_ID,
          WINES_CATEGORY_ID,
          SPIRITS_CATEGORY_ID,
          LIQUERS_CATEGORY_ID,
          PORT_CATEGORY_ID,
        ]
        if (document?.category) {
          return !validCategories.includes(document.category._ref)
        }
        return true
      },
    }),
    defineField({
      name: 'container',
      title: 'Container',
      type: 'string',
      options: {
        list: ['Can', 'Bottle'],
      },
      validation: (rule) => rule.required(),
      hidden: ({document}: {document: TagDocument | undefined}) => {
        const validCategories = [BEERS_CATEGORY_ID, CIDERS_CATEGORY_ID]
        if (document?.category) {
          return !validCategories.includes(document.category._ref)
        }
        return true
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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {
              title: 'Heading 1',
              value: 'h3',
            },
            {
              title: 'Heading 2',
              value: 'h4',
            },
            {
              title: 'Heading 3',
              value: 'h5',
            },
          ],
        },
        {
          type: 'image',
        },
      ],
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
