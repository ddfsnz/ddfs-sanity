import {defineField, ValidationContext} from 'sanity'
import {ProductDocument} from './productType'
import {BEERS_CATEGORY_ID} from './_constants'
import {PercentInput} from '../components/PercentInput'

export const beerOptions = defineField({
  name: 'options',
  title: 'Product Options',
  type: 'object',
  validation: (rule) =>
    rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
      const categoryRef = context.document?.category?._ref
      if (categoryRef && categoryRef === BEERS_CATEGORY_ID) {
        return value ? true : 'Required'
      }
      return true
    }),
  fields: [
    defineField({
      name: 'style',
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
      name: 'abv',
      title: 'Strength (ABV)',
      type: 'number',
      components: {
        input: PercentInput,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'container',
      title: 'Container',
      type: 'string',
      options: {
        list: ['Cans', 'Bottles'],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'object',
      validation: (rule) => rule.required(),
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
      name: 'quantityOptions',
      title: 'Quantity Options (items per pack)',
      description: 'e.g. 6 or 24 pack of beer.',
      type: 'array',
      of: [{type: 'number'}],
    }),
  ],
})
