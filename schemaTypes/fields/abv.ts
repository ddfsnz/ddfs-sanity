import {defineField} from 'sanity'
import {PercentInput} from '../../components/PercentInput'

export const abvField = defineField({
  name: 'abv',
  title: 'Strength (ABV)',
  type: 'number',
  components: {
    input: PercentInput,
  },
  validation: (rule) => rule.required(),
})
