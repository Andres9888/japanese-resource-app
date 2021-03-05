export interface exampleType {
  _id?: string
  name: string
  username: string
  avatar?: string
}

export interface Viewer {
  id: string | null;
  token: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
}
