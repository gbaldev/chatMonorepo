import React from 'react';
import { UserInfoProvider } from './src/contexts/UserInfo/provider';
import StackNavigator from './src/navigation/stackNavigator';

const App = () => {
  return (
    <>
      <UserInfoProvider>
        <StackNavigator />
      </UserInfoProvider>
    </>
  );
};

export default App;
