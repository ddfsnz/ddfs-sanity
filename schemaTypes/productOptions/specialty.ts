import {defineField, ValidationContext} from 'sanity'
import {ProductDocument} from '../productType'
import {SPECIALTY_CATEGORY_ID} from '../_constants'
import {styleField} from '../fields/style'
import {sizeField} from '../fields/size'

export const specialtyOptions = defineField({
  name: 'specialtyOptions',
  title: 'Product Options',
  type: 'object',
  validation: (rule) =>
    rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
      const categoryRef = context.document?.category?._ref
      if (categoryRef && categoryRef === SPECIALTY_CATEGORY_ID) {
        return value ? true : 'Required'
      }
      return true
    }),
  fields: [styleField, sizeField],
})
