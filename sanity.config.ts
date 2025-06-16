import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes/_index'

export default defineConfig({
  name: 'default',
  title: 'DDFS',
  projectId: '3bz1eczr',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('DDFS')
          .items([
            S.listItem()
              .title('All Products')
              .icon(() => '🛍️')
              .schemaType('product')
              .child(
                S.documentTypeList('product')
                  .title('All Products')
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),

            S.divider().title('Products By Category'),
            S.listItem()
              .title('Beers')
              .icon(() => '🍺')
              .child(
                S.documentTypeList('product')
                  .title('Beers')
                  .filter(
                    '_type == "product" && category._ref == "1ba1526c-f516-4c61-bea8-dda1e2c5fcc0"',
                  )
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Wines')
              .icon(() => '🥂')
              .child(
                S.documentTypeList('product')
                  .title('Wines')
                  .filter(
                    '_type == "product" && category._ref == "6e00044c-9bd3-4714-83d8-0ef3dfb3f445"',
                  )
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Spirits')
              .icon(() => '🍸')
              .child(
                S.documentTypeList('product')
                  .title('Spirits')
                  .filter(
                    '_type == "product" && category._ref == "ec175758-a8ad-4ace-a2ba-d1b176cefe15"',
                  )
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Liquers')
              .icon(() => '🍹')
              .child(
                S.documentTypeList('product')
                  .title('Liquers')
                  .filter(
                    '_type == "product" && category._ref == "73d69b11-ea27-4760-98da-d15894846031"',
                  )
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Port')
              .icon(() => '🍷')
              .child(
                S.documentTypeList('product')
                  .title('Port')
                  .filter(
                    '_type == "product" && category._ref == "8770527f-e336-43cb-a2b2-3f8dc39baa76"',
                  )
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Tobacco')
              .icon(() => '🚬')
              .child(
                S.documentTypeList('product')
                  .title('Tobacco')
                  .filter(
                    '_type == "product" && category._ref == "0fa5237f-94fa-4e1b-ae62-2b47e8e7a6b3"',
                  )
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Manuka Honey')
              .icon(() => '🍯')
              .child(
                S.documentTypeList('product')
                  .title('Manuka Honey')
                  .filter(
                    '_type == "product" && category._ref == "a9fb46bc-cd9e-4f80-b517-a431d5ce457c"',
                  )
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),

            S.divider().title('Categories & Tags'),
            S.listItem()
              .title('Categories')
              .icon(() => '⚙️')
              .schemaType('category')
              .child(
                S.documentTypeList('category')
                  .title('Categories')
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
