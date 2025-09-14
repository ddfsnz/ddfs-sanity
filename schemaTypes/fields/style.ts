import {defineField} from 'sanity'
import {ProductDocument} from '../productType'

export const styleField = defineField({
  name: 'style',
  title: 'Style',
  type: 'reference',
  to: [{type: 'tag'}],
  validation: (rule) => rule.required(),
  options: {
    filter: ({document}: {document: ProductDocument}) => {
      if (!document?.category?._ref) {
        return {
          filter: 'category._ref == $categoryRef',
          params: {categoryRef: null},
        }
      }
      return {
        filter: 'category._ref == $categoryRef',
        params: {categoryRef: document.category._ref},
      }
    },
  },
})
