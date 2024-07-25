import React, { useEffect } from 'react';
import ChatRoomScreen from '@screens/ChatRoomScreen';
import { RegisterBackgroundTask } from '@notifications/index.ts';
import { useUserInfo } from '@contexts/UserInfo/context';

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
