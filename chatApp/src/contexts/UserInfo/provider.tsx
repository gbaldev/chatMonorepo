import React, { useEffect, useMemo, useState } from 'react';
import { UserInfoContextType, Provider } from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import consts from '@constants/consts';
import Message from '@models/Message';
import User from '@models/User';

type UserInfoProviderProps = {
  children: any;
};

export const UserInfoProvider: React.ComponentType<UserInfoProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const setUser = (u: User) => {
    AsyncStorage.setItem(consts.storage.user, JSON.stringify(u));
  };

  const getUser = async () => {
    let user = await AsyncStorage.getItem(consts.storage.user);
    if (user) {
      return JSON.parse(user ?? {});
    }
  };

  useEffect(() => {
    const loadState = async () => {
      const savedState = await AsyncStorage.getItem(consts.storage.messages);
      if (savedState) {
        setMessages(JSON.parse(savedState));
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      await AsyncStorage.setItem(
        consts.storage.messages,
        JSON.stringify(messages),
      );
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
