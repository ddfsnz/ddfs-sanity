import {defineField, ValidationContext} from 'sanity'
import {ProductDocument} from '../productType'
import {SPIRITS_CATEGORY_ID} from '../_constants'
import {styleField} from '../fields/style'
import {abvField} from '../fields/abv'
import {sizeField} from '../fields/size'

export const liquerOptions = defineField({
  name: 'liquerOptions',
  title: 'Product Options',
  type: 'object',
  validation: (rule) =>
    rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
      const categoryRef = context.document?.category?._ref
      if (categoryRef && categoryRef === SPIRITS_CATEGORY_ID) {
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
