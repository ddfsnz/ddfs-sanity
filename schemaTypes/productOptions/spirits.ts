import {defineField, ValidationContext} from 'sanity'
import {SPIRITS_CATEGORY_ID} from '../_constants'
import {ProductDocument} from '../productType'
import {abvField} from '../fields/abv'
import {sizeField} from '../fields/size'
import {styleField} from '../fields/style'

export const spiritOptions = defineField({
  name: 'spiritOptions',
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
      name: 'age',
      title: 'Age (Years)',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isExportExclusive',
      title: 'Export Exclusive',
      type: 'boolean',
    }),
  ],
})
