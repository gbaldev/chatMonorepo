import React, { useEffect, useMemo, useState } from 'react';
import User from '../../models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, UserInfoContextType } from './context';
import { Message } from '../../screens/ChatRoomScreen';

type UserInfoProviderProps = {
  children: any;
};

export const UserInfoProvider: React.ComponentType<UserInfoProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const setUser = (u: User) => {
    AsyncStorage.setItem('user', JSON.stringify(u));
  };

  const getUser = async () => {
    let user = await AsyncStorage.getItem('user');
    if (user) {
      return JSON.parse(user ?? {});
    }
  };

  useEffect(() => {
    const loadState = async () => {
      const savedState = await AsyncStorage.getItem('MY_MESSAGES');
      if (savedState) {
        console.log('aver');
        setMessages(JSON.parse(savedState));
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      await AsyncStorage.setItem('MY_MESSAGES', JSON.stringify(messages));
    };
    saveState();
  }, [messages]);

  const contextValue = useMemo<UserInfoContextType>(
    () => ({
      messages,
      setUser,
      getUser,
      setMessages,
    }),
    [messages],
  );

  return <Provider value={contextValue}>{children}</Provider>;
};
