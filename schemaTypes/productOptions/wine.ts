import {defineField, ValidationContext} from 'sanity'
import {WINES_CATEGORY_ID} from '../_constants'
import {ProductDocument} from '../productType'
import {abvField} from '../fields/abv'
import {sizeField} from '../fields/size'
import {styleField} from '../fields/style'

export const wineOptions = defineField({
  name: 'wineOptions',
  title: 'Product Options',
  type: 'object',
  validation: (rule) =>
    rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
      const categoryRef = context.document?.category?._ref
      if (categoryRef && categoryRef === WINES_CATEGORY_ID) {
        return value ? true : 'Required'
      }
      return true
    }),
  fields: [
    defineField({
      name: 'wineType',
      title: 'Type',
      type: 'string',
      options: {
        list: ['Red', 'White'],
      },
      validation: (rule) => rule.required(),
    }),
    styleField,
    abvField,
    sizeField,
    defineField({
      name: 'year',
      title: 'Year',
      description: 'Leave blank for no vintage',
      type: 'number',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
