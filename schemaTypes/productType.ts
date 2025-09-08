import {defineField, defineType, SanityDocument, ValidationContext} from 'sanity'
import {
  BEERS_CATEGORY_ID,
  CIDERS_CATEGORY_ID,
  HONEY_CATEGORY_ID,
  LIQUERS_CATEGORY_ID,
  PORT_CATEGORY_ID,
  SPIRITS_CATEGORY_ID,
  TOBACCO_CATEGORY_ID,
  TOBACCO_STYLE_ID,
  WINES_CATEGORY_ID,
} from './_constants'
import {DollarInput} from '../components/DollarInput'
import {PercentInput} from '../components/PercentInput'

interface ProductDocument extends SanityDocument {
  category?: {
    _ref: string
    _type: 'reference'
  }
  tag?: {
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
        filter: ({document}: {document: ProductDocument}) => {
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
      name: 'wineType',
      title: 'Type',
      type: 'string',
      options: {
        list: ['Red', 'White'],
      },
      validation: (rule) =>
        rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
          const categoryRef = context.document?.category?._ref
          if (categoryRef && categoryRef === WINES_CATEGORY_ID) {
            return value ? true : 'Wine type is required for this category'
          }
          return true
        }),
      hidden: ({document}: {document: ProductDocument | undefined}) => {
        if (document?.category) {
          return !(document.category._ref === WINES_CATEGORY_ID)
        }
        return true
      },
    }),
    defineField({
      name: 'abv',
      title: 'Strength (ABV)',
      type: 'number',
      components: {
        input: PercentInput,
      },
      validation: (rule) =>
        rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
          const validCategories = [
            BEERS_CATEGORY_ID,
            CIDERS_CATEGORY_ID,
            WINES_CATEGORY_ID,
            SPIRITS_CATEGORY_ID,
            LIQUERS_CATEGORY_ID,
            PORT_CATEGORY_ID,
          ]
          const categoryRef = context.document?.category?._ref
          if (categoryRef && validCategories.includes(categoryRef)) {
            return value! > 0 ? true : 'Strength is required for this category'
          }
          return true
        }),
      hidden: ({document}: {document: ProductDocument | undefined}) => {
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
        list: ['Cans', 'Bottles'],
      },
      validation: (rule) =>
        rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
          const validCategories = [BEERS_CATEGORY_ID, CIDERS_CATEGORY_ID]
          const categoryRef = context.document?.category?._ref
          if (categoryRef && validCategories.includes(categoryRef)) {
            return value ? true : 'Container is required for this category'
          }
          return true
        }),
      hidden: ({document}: {document: ProductDocument | undefined}) => {
        const validCategories = [BEERS_CATEGORY_ID, CIDERS_CATEGORY_ID]
        if (document?.category) {
          return !validCategories.includes(document.category._ref)
        }
        return true
      },
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'object',
      validation: (rule) =>
        rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
          const validCategories = [
            BEERS_CATEGORY_ID,
            CIDERS_CATEGORY_ID,
            HONEY_CATEGORY_ID,
            LIQUERS_CATEGORY_ID,
            PORT_CATEGORY_ID,
            SPIRITS_CATEGORY_ID,
            WINES_CATEGORY_ID,
          ]
          const categoryRef = context.document?.category?._ref
          const tagRef = context.document?.tag?._ref

          if (
            (categoryRef && validCategories.includes(categoryRef)) ||
            (categoryRef === TOBACCO_CATEGORY_ID && tagRef === TOBACCO_STYLE_ID)
          ) {
            return value ? true : 'Size is required for this category/style'
          }
          return true
        }),
      hidden: ({document}: {document: ProductDocument | undefined}) => {
        const validCategories = [
          BEERS_CATEGORY_ID,
          CIDERS_CATEGORY_ID,
          HONEY_CATEGORY_ID,
          LIQUERS_CATEGORY_ID,
          PORT_CATEGORY_ID,
          SPIRITS_CATEGORY_ID,
          WINES_CATEGORY_ID,
        ]
        const categoryRef = document?.category?._ref
        const tagRef = document?.tag?._ref

        if (categoryRef) {
          return !(
            validCategories.includes(categoryRef) ||
            (categoryRef === TOBACCO_CATEGORY_ID && tagRef === TOBACCO_STYLE_ID)
          )
        }
        return true
      },
      fields: [
        {
          name: 'value',
          title: 'Value',
          type: 'number',
          validation: (rule) => rule.required().min(1),
        },
        {
          name: 'unit',
          title: 'Unit',
          type: 'string',
          validation: (rule) => rule.required(),
          options: {
            list: [
              {value: 'ml', title: 'mL'},
              {value: 'g', title: 'g'},
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity (items per pack)',
      description: 'e.g. 6 or 24 pack of beer.',
      type: 'array',
      of: [{type: 'number'}],
    }),
    defineField({
      name: 'company',
      title: 'Company/Producer',
      type: 'reference',
      to: [{type: 'company'}],
      validation: (rule) => rule.required(),
      options: {
        filter: ({document}: {document: ProductDocument}) => {
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
      name: 'quantityOptions',
      title: 'Default Quantity Options',
      description: 'Customers can also enter custom quantities.',
      type: 'array',
      of: [{type: 'number'}],
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
