export interface Viewer {
  id?: string;
  token?: string;
  avatar?: string;
  name?: string;
  isCommited?: boolean | null;
  hasWallet: boolean | null;
  didRequest: boolean;
}

export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
}
