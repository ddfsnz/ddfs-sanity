import {defineField, ValidationContext} from 'sanity'
import {ProductDocument} from '../productType'
import {CIDERS_CATEGORY_ID} from '../_constants'
import {styleField} from '../fields/style'
import {abvField} from '../fields/abv'
import {containerField} from '../fields/container'
import {sizeField} from '../fields/size'
import {quantityField} from '../fields/quantity'

export const ciderOptions = defineField({
  name: 'ciderOptions',
  title: 'Product Options',
  type: 'object',
  validation: (rule) =>
    rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
      const categoryRef = context.document?.category?._ref
      if (categoryRef && categoryRef === CIDERS_CATEGORY_ID) {
        return value ? true : 'Required'
      }
      return true
    }),
  fields: [
    styleField,
    abvField,
    containerField,
    sizeField,
    defineField({
      ...quantityField,
      description: 'e.g. 6 or 24 pack.',
    }),
  ],
})
