import {createClient} from '@sanity/client'
import {XeroClient} from 'xero-node'

function getEnvVar(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Required environment variable ${name} is not set`)
  }
  return value
}

const run = async () => {
  const xeroClientId = getEnvVar('XERO_CLIENT_ID')
  const xeroClientSecret = getEnvVar('XERO_CLIENT_SECRET')
  const xeroClient = new XeroClient({
    clientId: xeroClientId,
    clientSecret: xeroClientSecret,
    grantType: 'client_credentials',
  })
  await xeroClient.getClientCredentialsToken()

  const lastRunTimestamp = getEnvVar('LAST_RUN_TIMESTAMP')
  console.log(`⬇️ Fetching products updated in Xero since last run: ${lastRunTimestamp}`)
  const allXeroProducts = await xeroClient.accountingApi.getItems('', new Date()) // Empty xeroTenantId for custom connection
  if (!allXeroProducts) {
    console.error('❌ No products returned from Xero')
    return
  }
  if (!allXeroProducts.body.items?.length) {
    console.warn('⚠️ No products updated in Xero since last sync')
    return
  }
  console.log(`⬇️ Fetched ${allXeroProducts.body.items.length} products from Xero`)
  const filteredXeroProducts = allXeroProducts.body.items.filter(
    (product) => product.isTrackedAsInventory && product.isSold,
  )
  if (!filteredXeroProducts.length) {
    console.warn('⚠️ No valid products updated in Xero since last sync')
    return
  }
  console.log(`⚙️ Filtered ${filteredXeroProducts.length} products to be synced with Sanity`)
  console.log(`⬆️ Products to sync:`)
  filteredXeroProducts.forEach((product) => console.log(product.name))

  const sanityProjectId = getEnvVar('SANITY_PROJECT_ID')
  const sanityApiToken = getEnvVar('SANITY_API_TOKEN')
  const sanityClient = createClient({
    projectId: sanityProjectId,
    token: sanityApiToken,
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-05-01',
  })

  const publishedProducts = await sanityClient.fetch<{_id: string}[]>(
    `*[_type == "product" && _id in $ids]`,
    {ids: filteredXeroProducts.map((product) => product.itemID)},
  )
  console.log(`⬇️ Fetched ${publishedProducts.length} published products from Sanity`)

  const draftProducts = await sanityClient.fetch<{_id: string}[]>(
    `*[_type == "product" && _id in $ids]`,
    {ids: filteredXeroProducts.map((product) => product.itemID)},
    {perspective: 'drafts'},
  )
  console.log(`⬇️ Fetched ${draftProducts.length} draft products from Sanity`)

  let publishedProductsUpdated = 0
  let draftProductsUpdated = 0
  let draftProductsCreated = 0

  for (const product of filteredXeroProducts) {
    if (!product.itemID) {
      console.error(`❌ Missing product ID: [${product.code} ${product.name}]`)
      return
    }

    try {
      const publishedProduct = publishedProducts.find((entry) => entry._id === product.itemID)
      const draftProduct = draftProducts.find((entry) => entry._id === product.itemID)

      let document
      if (publishedProduct) {
        document = await sanityClient
          .patch(product.itemID)
          .set({
            name: product.name,
            price: product.salesDetails?.unitPrice ?? 0,
            stock: product.quantityOnHand ?? 0,
            code: product.code,
          })
          .commit()
        publishedProductsUpdated++
        console.log(`✅ Updated published product [${document.code} ${document.name}]`)
      } else if (draftProduct) {
        document = await sanityClient
          .patch(`drafts.${product.itemID}`)
          .set({
            name: product.name,
            price: product.salesDetails?.unitPrice ?? 0,
            stock: product.quantityOnHand ?? 0,
            code: product.code,
          })
          .commit()
        draftProductsUpdated++
        console.log(`✅ Updated draft product [${document.code} ${document.name}]`)
      } else {
        document = await sanityClient.createIfNotExists({
          _id: `drafts.${product.itemID}`,
          _type: 'product',
          name: product.name,
          price: product.salesDetails?.unitPrice ?? 0,
          stock: product.quantityOnHand ?? 0,
          code: product.code,
        })
        draftProductsCreated++
        console.log(`✅ Created draft product [${document.code} ${document.name}]`)
      }
    } catch (error) {
      console.error(`❌ Failed to process product [${product.code} ${product.name}]`, error)
    }
  }

  console.log(`✅ Updated ${publishedProductsUpdated} published products in Sanity`)
  console.log(`✅ Updated ${draftProductsUpdated} draft products in Sanity`)
  console.log(`✅ Created ${draftProductsCreated} draft products in Sanity`)
}

run()
