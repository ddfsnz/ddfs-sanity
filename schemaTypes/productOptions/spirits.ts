import {defineField, ValidationContext} from 'sanity'
import {ProductDocument} from '../productType'
import {SPIRITS_CATEGORY_ID} from '../_constants'
import {styleField} from '../fields/style'
import {abvField} from '../fields/abv'
import {sizeField} from '../fields/size'

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
