import { NativeStackNavigationProp } from '@react-navigation/native-stack';

enum StackRoutes {
  REGISTER = 'REGISTER',
  CHATROOM = 'CHATROOM',
}

export type StackRoutesList = {
  [StackRoutes.REGISTER]: {};
  [StackRoutes.CHATROOM]: {
    firstName: string;
    lastName: string;
  };
};

export type RootStackNavigationProp<T extends keyof StackRoutesList> =
  NativeStackNavigationProp<StackRoutesList, T>;

export default StackRoutes;
