import React, { useEffect } from 'react';
import ChatRoomScreen from '../../screens/ChatRoomScreen';
import { useUserInfo } from '../../contexts/UserInfo/context';
import { NativeModules, Platform } from 'react-native';

interface ChatRoomScreenProps {}

const ChatRoomScreenContainer: React.ComponentType<
  ChatRoomScreenProps
> = () => {
  const { messages = [] } = useUserInfo();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      try {
        NativeModules.BackgroundTaskModule.startBackgroundTask();
      } catch (e) {
        console.log('Error starting background task');
      }
    }
  });

  return <ChatRoomScreen chatMessages={messages} />;
};

export default ChatRoomScreenContainer;
