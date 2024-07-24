import { Platform } from 'react-native';
import User from '../../models/User';

export interface URLConfig {
  apiVersion: string;
  base: string;
  login: string;
}

/*
   Android and iOS handle localhost differently, to access from Android
    it should be specified as http://10.0.2.2:3000, instead, iOS works
    and MUST use localhost.
*/
const localhost = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://10.0.2.2:3000',
});

class ChatApi {
  base = `${localhost}`;
  notify = `${localhost}/notify`;
  register = (user: Partial<User>) => ({
    url: `${this.base}/register`,
    data: user,
  });
}

const BeerSupplyApiInstance = new ChatApi();

export default BeerSupplyApiInstance;
