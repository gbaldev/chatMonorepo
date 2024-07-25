import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import StackRoutes from './routes';
import RegisterScreenContainer from '../containers/RegisterScreen';
import ChatRoomScreenContainer from '../containers/ChatRoomScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import consts from '../constants/consts';

const Stack = createNativeStackNavigator();

interface StackNavigatorProps {}

const StackNavigator: React.ComponentType<StackNavigatorProps> = () => {
  const [navState, setNavState] = React.useState(null);

  React.useEffect(() => {
    const loadNavState = async () => {
      const savedState = await AsyncStorage.getItem(
        consts.storage.navigationState,
      );
      if (savedState) {
        setNavState(JSON.parse(savedState));
      }
    };
    loadNavState();
  }, []);

  return (
    <NavigationContainer
      initialState={navState ?? undefined}
      onStateChange={state =>
        AsyncStorage.setItem(
          consts.storage.navigationState,
          JSON.stringify(state),
        )
      }>
      <Stack.Navigator>
        <Stack.Screen
          name={StackRoutes.REGISTER}
          component={RegisterScreenContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={StackRoutes.CHATROOM}
          component={ChatRoomScreenContainer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
