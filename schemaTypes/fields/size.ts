import {defineField} from 'sanity'

export const sizeField = defineField({
  name: 'size',
  title: 'Size',
  type: 'object',
  validation: (rule) => rule.required(),
  fields: [
    {
      name: 'value',
      title: 'Value',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    },
    {
      name: 'unit',
      title: 'Unit',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {value: 'ml', title: 'mL'},
          {value: 'g', title: 'g'},
        ],
      },
    },
  ],
})
