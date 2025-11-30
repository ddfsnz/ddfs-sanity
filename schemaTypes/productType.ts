import {defineField, defineType, SanityDocument} from 'sanity'
import {DollarInput} from '../components/DollarInput'
import {
  BEERS_CATEGORY_ID,
  CIDERS_CATEGORY_ID,
  HONEY_CATEGORY_ID,
  LIQUEURS_CATEGORY_ID,
  PORTS_CATEGORY_ID,
  SPIRITS_CATEGORY_ID,
  TOBACCO_CATEGORY_ID,
  WINES_CATEGORY_ID,
} from './_constants'
import {quantityField} from './fields/quantity'
import {beerOptions} from './productOptions/beer'
import {ciderOptions} from './productOptions/cider'
import {honeyOptions} from './productOptions/honey'
import {liquerOptions} from './productOptions/liqueurs'
import {portOptions} from './productOptions/port'
import {spiritOptions} from './productOptions/spirits'
import {tobaccoOptions} from './productOptions/tobacco'
import {wineOptions} from './productOptions/wine'

export interface ProductDocument extends SanityDocument {
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
      name: 'displayName',
      title: 'Display Name (Optional)',
      description:
        'Override Xero product name for display on the website. If not set, Xero product name will be used.',
      type: 'string',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company/Producer',
      description:
        'Company/Producer contains country of origin. Wine regions are configured under Product Options.',
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
      name: 'price',
      title: 'Price (excl. GST)',
      description: 'Updated automatically from Xero.',
      type: 'number',
      readOnly: true,
      validation: (rule) => rule.required().min(0),
      components: {
        input: DollarInput,
      },
    }),
    defineField({
      name: 'isOnClearance',
      title: 'On Clearance',
      description:
        'Display clearance label on product on website. Not needed if specific deal configured.',
      type: 'boolean',
    }),
    defineField({
      name: 'deal',
      title: 'Deal',
      type: 'object',
      fields: [
        defineField({
          name: 'isEnabled',
          title: 'Enable Deal Price',
          type: 'boolean',
          description: 'Configure specific deal for this product.',
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
      ...quantityField,
      description:
        'Default quantity options for selection. Customers can also enter custom quantities.',
    }),
    // Beer Options
    defineField({
      ...beerOptions,
      hidden: ({document}: {document: ProductDocument | undefined}) => {
        return document?.category?._ref !== BEERS_CATEGORY_ID
      },
    }),
    // Cider Options
    defineField({
      ...ciderOptions,
      hidden: ({document}: {document: ProductDocument | undefined}) => {
        return document?.category?._ref !== CIDERS_CATEGORY_ID
      },
    }),
    // Wine Options
    defineField({
      ...wineOptions,
      hidden: ({document}: {document: ProductDocument | undefined}) => {
        return document?.category?._ref !== WINES_CATEGORY_ID
      },
    }),
    // Spirits Options
    defineField({
      ...spiritOptions,
      hidden: ({document}: {document: ProductDocument | undefined}) => {
        return document?.category?._ref !== SPIRITS_CATEGORY_ID
      },
    }),
    // Liqueurs Options
    defineField({
      ...liquerOptions,
      hidden: ({document}: {document: ProductDocument | undefined}) => {
        return document?.category?._ref !== LIQUEURS_CATEGORY_ID
      },
    }),
    // Port Options
    defineField({
      ...portOptions,
      hidden: ({document}: {document: ProductDocument | undefined}) => {
        return document?.category?._ref !== PORTS_CATEGORY_ID
      },
    }),
    // Tobacco Options
    defineField({
      ...tobaccoOptions,
      hidden: ({document}: {document: ProductDocument | undefined}) => {
        return document?.category?._ref !== TOBACCO_CATEGORY_ID
      },
    }),
    // Honey Options
    defineField({
      ...honeyOptions,
      hidden: ({document}: {document: ProductDocument | undefined}) => {
        return document?.category?._ref !== HONEY_CATEGORY_ID
      },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Updated automatically from Xero.',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      description: 'Updated automatically from Xero.',
      type: 'number',
      readOnly: true,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      description: 'Updated automatically from Xero.',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
  ],
})
