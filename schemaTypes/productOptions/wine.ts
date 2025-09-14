import {defineField, ValidationContext} from 'sanity'
import {ProductDocument} from '../productType'
import {WINES_CATEGORY_ID} from '../_constants'
import {styleField} from '../fields/style'
import {abvField} from '../fields/abv'
import {sizeField} from '../fields/size'

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
  ],
})
