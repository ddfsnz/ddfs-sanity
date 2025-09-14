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
  PORTS_CATEGORY_ID,
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
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "product" && category._ref == "${BEERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Beer Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Beer Styles')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "tag" && category._ref == "${BEERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: BEERS_CATEGORY_ID,
                    }),
                  ]),
              ),
            S.listItem()
              .title('Beer Producers')
              .icon(() => null)
              .child(
                S.documentTypeList('company')
                  .title('Beer Producers')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "company" && category._ref == "${BEERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('company-template', {
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
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "product" && category._ref == "${CIDERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Cider Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Cider Styles')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "tag" && category._ref == "${CIDERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: CIDERS_CATEGORY_ID,
                    }),
                  ]),
              ),
            S.listItem()
              .title('Cider Producers')
              .icon(() => null)
              .child(
                S.documentTypeList('company')
                  .title('Cider Producers')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "company" && category._ref == "${CIDERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('company-template', {
                      categoryId: CIDERS_CATEGORY_ID,
                    }),
                  ]),
              ),

            S.divider(),

            S.listItem()
              .title('Wines')
              .icon(() => '🥂')
              .child(
                S.documentTypeList('product')
                  .title('Wines')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "product" && category._ref == "${WINES_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Wine Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Wine Styles')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "tag" && category._ref == "${WINES_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: WINES_CATEGORY_ID,
                    }),
                  ]),
              ),
            S.listItem()
              .title('Wine Producers')
              .icon(() => null)
              .child(
                S.documentTypeList('company')
                  .title('Wine Producers')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "company" && category._ref == "${WINES_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('company-template', {
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
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "product" && category._ref == "${SPIRITS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Spirit Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Spirit Styles')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "tag" && category._ref == "${SPIRITS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: SPIRITS_CATEGORY_ID,
                    }),
                  ]),
              ),
            S.listItem()
              .title('Spirit Producers')
              .icon(() => null)
              .child(
                S.documentTypeList('company')
                  .title('Spirit Producers')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "company" && category._ref == "${SPIRITS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('company-template', {
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
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "product" && category._ref == "${LIQUERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Liquer Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Liquer Styles')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "tag" && category._ref == "${LIQUERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: LIQUERS_CATEGORY_ID,
                    }),
                  ]),
              ),
            S.listItem()
              .title('Liquer Producers')
              .icon(() => null)
              .child(
                S.documentTypeList('company')
                  .title('Liquer Producers')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "company" && category._ref == "${LIQUERS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('company-template', {
                      categoryId: LIQUERS_CATEGORY_ID,
                    }),
                  ]),
              ),

            S.divider(),

            S.listItem()
              .title('Port')
              .icon(() => '🍷')
              .child(
                S.documentTypeList('product')
                  .title('Port')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "product" && category._ref == "${PORTS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Port Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Port Styles')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "tag" && category._ref == "${PORTS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: PORTS_CATEGORY_ID,
                    }),
                  ]),
              ),
            S.listItem()
              .title('Port Producers')
              .icon(() => null)
              .child(
                S.documentTypeList('company')
                  .title('Port Producers')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "company" && category._ref == "${PORTS_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('company-template', {
                      categoryId: PORTS_CATEGORY_ID,
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
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "product" && category._ref == "${TOBACCO_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Tobacco Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Tobacco Styles')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "tag" && category._ref == "${TOBACCO_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: TOBACCO_CATEGORY_ID,
                    }),
                  ]),
              ),
            S.listItem()
              .title('Tobacco Producers')
              .icon(() => null)
              .child(
                S.documentTypeList('company')
                  .title('Tobacco Producers')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "company" && category._ref == "${TOBACCO_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('company-template', {
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
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "product" && category._ref == "${HONEY_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Honey Styles')
              .icon(() => null)
              .child(
                S.documentTypeList('tag')
                  .title('Honey Styles')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "tag" && category._ref == "${HONEY_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('style-template', {
                      categoryId: HONEY_CATEGORY_ID,
                    }),
                  ]),
              ),
            S.listItem()
              .title('Honey Producers')
              .icon(() => null)
              .child(
                S.documentTypeList('company')
                  .title('Honey Producers')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "company" && category._ref == "${HONEY_CATEGORY_ID}"`)
                  .defaultOrdering([{field: 'name', direction: 'asc'}])
                  .initialValueTemplates([
                    S.initialValueTemplateItem('company-template', {
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
              .title('Product Categories')
              .icon(() => '⚙️')
              .schemaType('category')
              .child(
                S.documentTypeList('category')
                  .title('Product Categories')
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('All Product Styles')
              .icon(() => '⚙️')
              .schemaType('tag')
              .child(
                S.documentTypeList('tag')
                  .apiVersion('v2025-02-19')
                  .filter(`_type == "tag" && type == "style"`)
                  .title('Product Styles')
                  .defaultOrdering([{field: 'name', direction: 'asc'}]),
              ),
            S.listItem()
              .title('All Companies/Producers')
              .icon(() => '🏭')
              .schemaType('company')
              .child(
                S.documentTypeList('company')
                  .title('Companies/Producers')
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
      {
        id: 'company-template',
        title: 'Company Template',
        schemaType: 'company',
        parameters: [{name: 'categoryId', type: 'string'}],
        value: (params: {categoryId: string}) => ({
          category: {
            _type: 'reference',
            _ref: params.categoryId,
          },
        }),
      },
    ],
  },
})
