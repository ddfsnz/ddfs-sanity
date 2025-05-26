import {createClient} from '@sanity/client'

function getEnvVar(name: string) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Required environment variable ${name} is not set`)
  }
  return value
}

// const mockXeroData = {
//   Id: '2ae8312e-f165-4dc8-9cfb-1ae11974dc59',
//   Status: 'OK',
//   ProviderName: 'DDFS Test',
//   DateTimeUTC: '/Date(1748255698810)/',
//   Items: [
//     {
//       ItemID: '1f437fdb-393a-4393-903d-e86b9ac1fca6',
//       Code: '000001',
//       Description: 'D & G Intenso Pour Homme EDP 125ml',
//       PurchaseDescription: 'D & G Intenso Pour Homme EDP 125ml',
//       UpdatedDateUTC: '/Date(1724383264737+0000)/',
//       PurchaseDetails: {
//         UnitPrice: 53.92,
//         COGSAccountCode: '310',
//         TaxType: 'INPUT2',
//       },
//       SalesDetails: {
//         UnitPrice: 70.0,
//         AccountCode: '200',
//         TaxType: 'OUTPUT2',
//       },
//       Name: 'D & G Intenso Pour Homme EDP 125ml',
//       IsTrackedAsInventory: true,
//       InventoryAssetAccountCode: '630',
//       TotalCostPool: 0.0,
//       QuantityOnHand: 0.0,
//       IsSold: true,
//       IsPurchased: true,
//     },
//     {
//       ItemID: '53b0ea2c-a913-42b1-a892-4a73343da9f9',
//       Code: '000002',
//       Description: 'Calvin Klein Eternity EDP For Him 100ml',
//       PurchaseDescription: 'Calvin Klein Eternity EDP For Him 100ml',
//       UpdatedDateUTC: '/Date(1724383341867+0000)/',
//       PurchaseDetails: {
//         UnitPrice: 32.75,
//         COGSAccountCode: '310',
//         TaxType: 'INPUT2',
//       },
//       SalesDetails: {
//         UnitPrice: 48.0,
//         AccountCode: '200',
//         TaxType: 'OUTPUT2',
//       },
//       Name: 'Calvin Klein Eternity EDP For Him 100ml',
//       IsTrackedAsInventory: true,
//       InventoryAssetAccountCode: '630',
//       TotalCostPool: 0.0,
//       QuantityOnHand: 0.0,
//       IsSold: true,
//       IsPurchased: true,
//     },
//   ],
// }

const main = async () => {
  // getEnvVar('XERO_CLIENT_ID')
  // getEnvVar('XERO_CLIENT_SECRET')

  const sanityProjectId = getEnvVar('SANITY_PROJECT_ID')
  const sanityClient = createClient({
    projectId: sanityProjectId,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2025-05-01',
  })

  const data = await sanityClient.fetch<number>(`count(*)`)
  console.log(data)

  // Fetch Xero products
  // Transform for Sanity schema
  // createIfNotExist
  // patch relevant product fields
}

main()
