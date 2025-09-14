import {defineField, ValidationContext} from 'sanity'
import {PORTS_CATEGORY_ID} from '../_constants'
import {ProductDocument} from '../productType'
import {abvField} from '../fields/abv'
import {sizeField} from '../fields/size'
import {styleField} from '../fields/style'

export const portOptions = defineField({
  name: 'portOptions',
  title: 'Product Options',
  type: 'object',
  validation: (rule) =>
    rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
      const categoryRef = context.document?.category?._ref
      if (categoryRef && categoryRef === PORTS_CATEGORY_ID) {
        return value ? true : 'Required'
      }
      return true
    }),
  fields: [styleField, abvField, sizeField],
})
