export default interface IProduct {
  _id: string
  name: string
  price: number
  active: boolean | string
}

export type ProductInput = Omit<IProduct,"id">