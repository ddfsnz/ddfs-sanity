import {createClient} from '@sanity/client'
import {XeroClient} from 'xero-node'

function getEnvVar(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Required environment variable ${name} is not set`)
  }
  return value
}

const mockXeroData = {
  Id: '2ae8312e-f165-4dc8-9cfb-1ae11974dc59',
  Status: 'OK',
  ProviderName: 'DDFS Test',
  DateTimeUTC: '/Date(1748255698810)/',
  Items: [
    {
      ItemID: '1f437fdb-393a-4393-903d-e86b9ac1fca6',
      Code: '000001',
      Description: 'D & G Intenso Pour Homme EDP 125ml',
      PurchaseDescription: 'D & G Intenso Pour Homme EDP 125ml',
      UpdatedDateUTC: '/Date(1724383264737+0000)/',
      PurchaseDetails: {
        UnitPrice: 53.92,
        COGSAccountCode: '310',
        TaxType: 'INPUT2',
      },
      SalesDetails: {
        UnitPrice: 70.0,
        AccountCode: '200',
        TaxType: 'OUTPUT2',
      },
      Name: 'D & G Intenso Pour Homme EDP 125ml',
      IsTrackedAsInventory: true,
      InventoryAssetAccountCode: '630',
      TotalCostPool: 0.0,
      QuantityOnHand: 0.0,
      IsSold: true,
      IsPurchased: true,
    },
    {
      ItemID: '53b0ea2c-a913-42b1-a892-4a73343da9f9',
      Code: '000002',
      Description: 'Calvin Klein Eternity EDP For Him 100ml',
      PurchaseDescription: 'Calvin Klein Eternity EDP For Him 100ml',
      UpdatedDateUTC: '/Date(1724383341867+0000)/',
      PurchaseDetails: {
        UnitPrice: 32.75,
        COGSAccountCode: '310',
        TaxType: 'INPUT2',
      },
      SalesDetails: {
        UnitPrice: 48.0,
        AccountCode: '200',
        TaxType: 'OUTPUT2',
      },
      Name: 'Calvin Klein Eternity EDP For Him 100ml',
      IsTrackedAsInventory: true,
      InventoryAssetAccountCode: '630',
      TotalCostPool: 0.0,
      QuantityOnHand: 0.0,
      IsSold: true,
      IsPurchased: true,
    },
  ],
}

const run = async () => {
  const xeroClientId = getEnvVar('XERO_CLIENT_ID')
  const xeroClientSecret = getEnvVar('XERO_CLIENT_SECRET')
  const xeroClient = new XeroClient({
    clientId: xeroClientId,
    clientSecret: xeroClientSecret,
    grantType: 'client_credentials',
  })
  const tokenSet = await xeroClient.getClientCredentialsToken()
  console.log('tokenSet:', tokenSet)

  const xeroProducts = await xeroClient.accountingApi.getItems('')
  console.log('xeroProducts:', xeroProducts.body)

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
    {ids: mockXeroData.Items.map((product) => product.ItemID)},
  )
  console.log(`⬇️ Fetched ${publishedProducts.length} published products from Sanity`)

  const draftProducts = await sanityClient.fetch<{_id: string}[]>(
    `*[_type == "product" && _id in $ids]`,
    {ids: mockXeroData.Items.map((product) => product.ItemID)},
    {perspective: 'drafts'},
  )
  console.log(`⬇️ Fetched ${draftProducts.length} draft products from Sanity`)

  for (const product of mockXeroData.Items) {
    try {
      const publishedProduct = publishedProducts.find((entry) => entry._id === product.ItemID)
      const draftProduct = draftProducts.find((entry) => entry._id === product.ItemID)

      let document
      if (publishedProduct) {
        document = await sanityClient
          .patch(product.ItemID)
          .set({
            name: product.Name,
            price: product.SalesDetails.UnitPrice,
            stock: product.QuantityOnHand,
            code: product.Code,
          })
          .commit()
        console.log(`✅ Updated published product [${document.name}]`)
      } else if (draftProduct) {
        document = await sanityClient
          .patch(`drafts.${product.ItemID}`)
          .set({
            name: product.Name,
            price: product.SalesDetails.UnitPrice,
            stock: product.QuantityOnHand,
            code: product.Code,
          })
          .commit()
        console.log(`✅ Updated draft product [${document.name}]`)
      } else {
        document = await sanityClient.createIfNotExists({
          _id: `drafts.${product.ItemID}`,
          _type: 'product',
          name: product.Name,
          price: product.SalesDetails.UnitPrice,
          stock: product.QuantityOnHand,
          code: product.Code,
        })
        console.log(`✅ Created draft product [${document.name}]`)
      }
    } catch (error) {
      console.error(
        `❌ Failed to process product [${product.Name}] (ID: ${product.ItemID}):`,
        error,
      )
    }
  }
}

run()
