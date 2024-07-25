import React, { useEffect } from 'react';
import ChatRoomScreen from '../../screens/ChatRoomScreen';
import { useUserInfo } from '../../contexts/UserInfo/context';
import { NativeModules, Platform } from 'react-native';
import { RegisterBackgroundTask } from '../../notifications';

interface ChatRoomScreenProps {}

const ChatRoomScreenContainer: React.ComponentType<
  ChatRoomScreenProps
> = () => {
  const { messages = [] } = useUserInfo();

  useEffect(() => {
    RegisterBackgroundTask();
  }, []);

  return <ChatRoomScreen chatMessages={messages} />;
};

export default ChatRoomScreenContainer;
