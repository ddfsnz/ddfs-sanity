export type XeroProduct = {
  ItemID: string
  Code: string
  Description: string
  PurchaseDescription: string
  UpdatedDateUTC: string // '/Date(1724383264737+0000)/'
  PurchaseDetails: {
    UnitPrice: number
    COGSAccountCode: string
    TaxType: string
  }
  SalesDetails: {
    UnitPrice: number
    AccountCode: string
    TaxType: string
  }
  Name: string
  IsTrackedAsInventory: boolean
  InventoryAssetAccountCode: string
  TotalCostPool: number
  QuantityOnHand: number
  IsSold: boolean
  IsPurchased: boolean
}

export type XeroData = {
  Id: string
  Status: string
  ProviderName: string
  DateTimeUTC: string // '/Date(1748255698810)/'
  Items: XeroProduct[]
}
