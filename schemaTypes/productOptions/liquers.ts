import {defineField, ValidationContext} from 'sanity'
import {LIQUERS_CATEGORY_ID} from '../_constants'
import {ProductDocument} from '../productType'
import {abvField} from '../fields/abv'
import {sizeField} from '../fields/size'
import {styleField} from '../fields/style'

export const liquerOptions = defineField({
  name: 'liquerOptions',
  title: 'Product Options',
  type: 'object',
  validation: (rule) =>
    rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
      const categoryRef = context.document?.category?._ref
      if (categoryRef && categoryRef === LIQUERS_CATEGORY_ID) {
        return value ? true : 'Required'
      }
      return true
    }),
  fields: [
    styleField,
    abvField,
    sizeField,
    defineField({
      name: 'isTravelExclusive',
      title: 'Travel Exclusive',
      type: 'boolean',
    }),
  ],
})
