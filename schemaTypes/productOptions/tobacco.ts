import {defineField, ValidationContext} from 'sanity'
import {TOBACCO_CATEGORY_ID, TOBACCO_STYLE_ID} from '../_constants'
import {ProductDocument} from '../productType'
import {quantityField} from '../fields/quantity'
import {sizeField} from '../fields/size'
import {styleField} from '../fields/style'

export const tobaccoOptions = defineField({
  name: 'tobaccoOptions',
  title: 'Product Options',
  type: 'object',
  validation: (rule) =>
    rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
      const categoryRef = context.document?.category?._ref
      if (categoryRef && categoryRef === TOBACCO_CATEGORY_ID) {
        return value ? true : 'Required'
      }
      return true
    }),
  fields: [
    styleField,
    defineField({
      ...quantityField,
      title: 'Pack Size',
      options: {
        list: [20, 25],
      },
      hidden: ({parent}) => parent?.style?._ref === TOBACCO_STYLE_ID,
      validation: (rule) =>
        rule.custom((value, context: ValidationContext) => {
          const parent = context.parent as {style?: {_ref?: string}} | undefined
          const styleRef = parent?.style?._ref
          if (styleRef !== TOBACCO_STYLE_ID && !value) {
            return 'Pack Size is required'
          }
          return true
        }),
    }),
    defineField({
      ...sizeField,
      hidden: ({parent}) => parent?.style?._ref !== TOBACCO_STYLE_ID,
      validation: (rule) =>
        rule.custom((value, context: ValidationContext) => {
          const parent = context.parent as {style?: {_ref?: string}} | undefined
          const styleRef = parent?.style?._ref
          if (styleRef === TOBACCO_STYLE_ID && !value) {
            return 'Size is required'
          }
          return true
        }),
    }),
  ],
})
