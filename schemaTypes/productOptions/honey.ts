import {defineField, ValidationContext} from 'sanity'
import {HONEY_CAPSULES_STYLE_ID, HONEY_CATEGORY_ID, HONEY_STYLE_ID} from '../_constants'
import {ProductDocument} from '../productType'
import {PlusInput} from '../../components/PlusInput'
import {quantityField} from '../fields/quantity'
import {sizeField} from '../fields/size'
import {styleField} from '../fields/style'

export const honeyOptions = defineField({
  name: 'honeyOptions',
  title: 'Product Options',
  type: 'object',
  validation: (rule) =>
    rule.custom((value, context: ValidationContext & {document?: ProductDocument}) => {
      const categoryRef = context.document?.category?._ref
      if (categoryRef && categoryRef === HONEY_CATEGORY_ID) {
        return value ? true : 'Required'
      }
      return true
    }),
  fields: [
    styleField,
    defineField({
      name: 'mgo',
      title: 'MGO',
      type: 'number',
      hidden: ({parent}) => parent?.style._ref !== HONEY_STYLE_ID,
    }),
    defineField({
      name: 'umf',
      title: 'UMF',
      type: 'number',
      components: {
        input: PlusInput,
      },
      hidden: ({parent}) => parent?.style._ref !== HONEY_STYLE_ID,
    }),
    defineField({
      name: 'range',
      title: 'Core/Special',
      type: 'string',
      options: {
        list: ['Core', 'Special'],
      },
      hidden: ({parent}) => parent?.style._ref !== HONEY_STYLE_ID,
      validation: (rule) =>
        rule.custom((value, context: ValidationContext) => {
          const parent = context.parent as {style?: {_ref?: string}} | undefined
          const styleRef = parent?.style?._ref
          if (styleRef === HONEY_STYLE_ID && !value) {
            return 'Core/Special Range is required'
          }
          return true
        }),
    }),
    defineField({
      ...sizeField,
      hidden: ({parent}) => parent?.style._ref === HONEY_CAPSULES_STYLE_ID,
      validation: (rule) =>
        rule.custom((value, context: ValidationContext) => {
          const parent = context.parent as {style?: {_ref?: string}} | undefined
          const styleRef = parent?.style?._ref
          if (styleRef !== HONEY_CAPSULES_STYLE_ID && !value) {
            return 'Size is required'
          }
          return true
        }),
    }),
    defineField({
      ...quantityField,
      title: 'Container Quantity',
      hidden: ({parent}) => parent?.style._ref !== HONEY_CAPSULES_STYLE_ID,
      validation: (rule) =>
        rule.custom((value, context: ValidationContext) => {
          const parent = context.parent as {style?: {_ref?: string}} | undefined
          const styleRef = parent?.style?._ref
          if (styleRef === HONEY_CAPSULES_STYLE_ID && !value) {
            return 'Container Quantity is required'
          }
          return true
        }),
    }),
  ],
})
