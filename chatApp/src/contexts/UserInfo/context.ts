import { createContext, useContext } from 'react';
import Message from '@models/Message';
import User from '@models/User';

export type UserInfoContextType = {
  messages?: Message[];
  setUser: (user: User) => void;
  getUser: () => Promise<User>;
  setMessages: (messages: Message[]) => void;
};

const UserInfoContext = createContext<UserInfoContextType | null>(null);
UserInfoContext.displayName = 'UserInfoContext';

export const { Consumer, Provider } = UserInfoContext;

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);

  if (!context) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }

  return context;
};
