export interface Viewer {
  _id?: string
  token?: string
  avatar?: string
  walletId?: string | null
  didRequest: boolean
}

export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
}
