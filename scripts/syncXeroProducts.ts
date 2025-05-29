import {createClient} from '@sanity/client'
import {Item, XeroClient} from 'xero-node'
import {SanityProduct} from './types'

const getEnvVar = (name: string) => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`❌ Required environment variable ${name} is not set`)
  }
  return value
}

const hasChanges = (xeroProduct: Item, sanityProduct: SanityProduct) => {
  return (
    xeroProduct.name !== sanityProduct.name ||
    (xeroProduct.salesDetails?.unitPrice ?? 0) !== sanityProduct.price ||
    xeroProduct.quantityOnHand !== sanityProduct.stock ||
    xeroProduct.code !== sanityProduct.code
  )
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

  const allXeroProducts = await xeroClient.accountingApi.getItems('') // Empty xeroTenantId for custom connection
  if (!allXeroProducts || !allXeroProducts.body.items?.length) {
    throw new Error('❌ No products returned from Xero')
  }
  console.log(`⬇️ Fetched ${allXeroProducts.body.items.length} products from Xero`)
  const filteredXeroProducts = allXeroProducts.body.items.filter(
    (product) => product.isTrackedAsInventory && product.isSold,
  )
  if (!filteredXeroProducts.length) {
    throw new Error('❌ No valid products updated in Xero since last sync')
  }
  console.log(`⚙️ Filtered ${filteredXeroProducts.length} products to be synced`)
  // filteredXeroProducts.forEach((product) => console.log(`- ${product.code} | ${product.name}`))

  const sanityProjectId = getEnvVar('SANITY_PROJECT_ID')
  const sanityApiToken = getEnvVar('SANITY_API_TOKEN')
  const sanityClient = createClient({
    projectId: sanityProjectId,
    token: sanityApiToken,
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-05-01',
  })

  const publishedProducts = await sanityClient.fetch<SanityProduct[]>(
    `*[_type == "product" && _id in $ids]`,
    {ids: filteredXeroProducts.map((product) => product.itemID)},
  )
  console.log(`⬇️ Fetched ${publishedProducts.length} published products from Sanity`)

  const draftProducts = await sanityClient.fetch<SanityProduct[]>(
    `*[_type == "product" && _id in $ids]`,
    {ids: filteredXeroProducts.map((product) => product.itemID)},
    {perspective: 'drafts'},
  )
  console.log(`⬇️ Fetched ${draftProducts.length} draft products from Sanity`)

  let publishedProductsUpdated = 0
  let draftProductsUpdated = 0
  let draftProductsCreated = 0

  for (const xeroProduct of filteredXeroProducts) {
    if (!xeroProduct.itemID) {
      console.error(`❌ Missing product ID: [${xeroProduct.code} | ${xeroProduct.name}]`)
      return
    }

    try {
      const publishedProduct = publishedProducts.find(
        (sanityProduct) => sanityProduct._id === xeroProduct.itemID,
      )
      const draftProduct = draftProducts.find(
        (sanityProduct) => sanityProduct._id === xeroProduct.itemID,
      )

      let document: SanityProduct
      if (publishedProduct) {
        if (hasChanges(xeroProduct, publishedProduct)) {
          document = await sanityClient
            .patch(xeroProduct.itemID)
            .set({
              name: xeroProduct.name,
              price: xeroProduct.salesDetails?.unitPrice ?? 0,
              stock: xeroProduct.quantityOnHand ?? 0,
              code: xeroProduct.code,
            })
            .commit()
          publishedProductsUpdated++
          console.log(
            `✅ Updated published product [${document.code} | ${document.name} | ${publishedProduct.stock}->${document.stock} | $${publishedProduct.price}->${document.price}]`,
          )
        }
      } else if (draftProduct) {
        if (hasChanges(xeroProduct, draftProduct)) {
          document = await sanityClient
            .patch(`drafts.${xeroProduct.itemID}`)
            .set({
              name: xeroProduct.name,
              price: xeroProduct.salesDetails?.unitPrice ?? 0,
              stock: xeroProduct.quantityOnHand ?? 0,
              code: xeroProduct.code,
            })
            .commit()
          draftProductsUpdated++
          console.log(
            `✅ Updated draft product [${document.code} | ${document.name} | ${draftProduct.stock}->${document.stock} | $${draftProduct.price}->${document.price}]`,
          )
        }
      } else {
        document = await sanityClient.createIfNotExists({
          _id: `drafts.${xeroProduct.itemID}`,
          _type: 'product',
          name: xeroProduct.name ?? 'Unknown Product',
          price: xeroProduct.salesDetails?.unitPrice ?? 0,
          stock: xeroProduct.quantityOnHand ?? 0,
          code: xeroProduct.code,
        })
        draftProductsCreated++
        console.log(
          `✅ Created draft product [${document.code} | ${document.name} | ${document.stock} | $${document.price}]`,
        )
      }
    } catch (error) {
      console.error(
        `❌ Failed to process product [${xeroProduct.code} | ${xeroProduct.name}]`,
        error,
      )
    }
  }

  console.log(`✅ Updated ${publishedProductsUpdated} published products in Sanity`)
  console.log(`✅ Updated ${draftProductsUpdated} draft products in Sanity`)
  console.log(`✅ Created ${draftProductsCreated} draft products in Sanity`)
}

run()
