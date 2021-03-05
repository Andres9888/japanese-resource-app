import { google } from 'googleapis'
import {hidden} from './hidden'
const auth = new google.auth.OAuth2(
  hidden.G_CLIENT_ID,
  hidden.G_CLIENT_SECRET,
  hidden.PUBLIC_URL
)

export const Google = {
  authUrl: auth.generateAuthUrl({
    access_type: 'online',
    scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
      ]
  }),
  logIn: async (code: string) => {
      const {tokens} = await auth.getToken(code)
      auth.setCredentials(tokens)
      const { data } = await google.people({ version: "v1", auth }).people.get({
        resourceName: "people/me",
        personFields: "emailAddresses,names,photos"
      });
  
      return { user: data };
    }
  }

