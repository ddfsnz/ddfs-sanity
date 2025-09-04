import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes/_index'
import {Logo} from './components/Logo'
import {
  BEERS_CATEGORY_ID,
  CIDERS_CATEGORY_ID,
  WINES_CATEGORY_ID,
  SPIRITS_CATEGORY_ID,
  LIQUERS_CATEGORY_ID,
  PORT_CATEGORY_ID,
  TOBACCO_CATEGORY_ID,
  HONEY_CATEGORY_ID,
} from './schemaTypes/_constants'

export default defineConfig({
  name: 'default',
  title: 'DDFS CMS',
  projectId: '3bz1eczr',
  dataset: 'production',
  icon: Logo,
  plugins: [
    structureTool({
      title: 'Content',
      structure: (S) =>
        S.list()
          .title('Website Content')
          .items([
            S.divider().title('Product Categories'),

            S.listItem()
              .title('Beers')
              .icon(() => '🍺')
              .child(
                S.documentTypeList('product')
                  .title('Beers')
                  .filter(`_type == "product" && category._ref == "${BEERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Beer Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Beer Styles')
                  .filter(`_type == "tag" && category._ref == "${BEERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: BEERS_CATEGORY_ID,
                    }),
                  ]),
              ),

            S.divider(),

            S.listItem()
              .title('Ciders')
              .icon(() => '🍏')
              .child(
                S.documentTypeList('product')
                  .title('Ciders')
                  .filter(`_type == "product" && category._ref == "${CIDERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),

            S.divider(),

            S.listItem()
              .title('Wines')
              .icon(() => '🥂')
              .child(
                S.documentTypeList('product')
                  .title('Wines')
                  .filter(`_type == "product" && category._ref == "${WINES_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Wine Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Wine Styles')
                  .filter(`_type == "tag" && category._ref == "${WINES_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: WINES_CATEGORY_ID,
                    }),
                  ]),
              ),

            S.divider(),

            S.listItem()
              .title('Spirits')
              .icon(() => '🍸')
              .child(
                S.documentTypeList('product')
                  .title('Spirits')
                  .filter(`_type == "product" && category._ref == "${SPIRITS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Spirit Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Spirit Styles')
                  .filter(`_type == "tag" && category._ref == "${SPIRITS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: SPIRITS_CATEGORY_ID,
                    }),
                  ]),
              ),

            S.divider(),

            S.listItem()
              .title('Liquers')
              .icon(() => '🍹')
              .child(
                S.documentTypeList('product')
                  .title('Liquers')
                  .filter(`_type == "product" && category._ref == "${LIQUERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),

            S.divider(),

            S.listItem()
              .title('Port')
              .icon(() => '🍷')
              .child(
                S.documentTypeList('product')
                  .title('Port')
                  .filter(`_type == "product" && category._ref == "${PORT_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Port Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Port Styles')
                  .filter(`_type == "tag" && category._ref == "${PORT_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: PORT_CATEGORY_ID,
                    }),
                  ]),
              ),

            S.divider(),

            S.listItem()
              .title('Tobacco')
              .icon(() => '🚬')
              .child(
                S.documentTypeList('product')
                  .title('Tobacco')
                  .filter(`_type == "product" && category._ref == "${TOBACCO_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Tobacco Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Tobacco Styles')
                  .filter(`_type == "tag" && category._ref == "${TOBACCO_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: TOBACCO_CATEGORY_ID,
                    }),
                  ]),
              ),

            S.divider(),

            S.listItem()
              .title('Manuka Honey')
              .icon(() => '🍯')
              .child(
                S.documentTypeList('product')
                  .title('Manuka Honey')
                  .filter(`_type == "product" && category._ref == "${HONEY_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Honey Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Honey Styles')
                  .filter(`_type == "tag" && category._ref == "${HONEY_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: HONEY_CATEGORY_ID,
                    }),
                  ]),
              ),

            S.divider().title('All Products'),

            S.listItem()
              .title('All Products')
              .icon(() => '🛍️')
              .schemaType('product')
              .child(
                S.documentTypeList('product')
                  .title('All Products')
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),

            S.divider().title('Categorisation'),
            S.listItem()
              .title('Categories')
              .icon(() => '⚙️')
              .schemaType('category')
              .child(
                S.documentTypeList('category')
                  .title('Categories')
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Countries')
              .icon(() => '🌏')
              .schemaType('country')
              .child(
                S.documentTypeList('country')
                  .title('Countries')
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
          ]),
    }),
    visionTool({
      title: 'Dev Query',
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: [
      {
        id: 'style-template',
        title: 'Style Template',
        schemaType: 'tag',
        parameters: [{name: 'categoryId', type: 'string'}],
        value: (params: {categoryId: string}) => ({
          category: {
            _type: 'reference',
            _ref: params.categoryId,
          },
          type: 'style',
        }),
      },
    ],
  },
})
