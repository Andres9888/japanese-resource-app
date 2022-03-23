export interface Viewer {
  id?: string;
  token?: string;
  avatar?: string;
  name?: string;
  hasWallet: boolean | null;
  didRequest: boolean;
}

export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
}
