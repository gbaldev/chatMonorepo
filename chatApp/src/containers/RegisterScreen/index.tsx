import React, { useEffect } from 'react';
import RegisterScreen from '../../screens/RegisterScreen';
import { useUserInfo } from '../../contexts/UserInfo/context';
import User from '../../models/User';
import socket from '../../constants/socket';
import { AppState } from 'react-native';
import { Message } from '../../screens/ChatRoomScreen';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import StackRoutes, { StackRoutesList } from '../../navigation/routes';
import { checkPermissions, sendNotification } from '../../notifications';
interface RegisterScreenContainerProps {}

const RegisterScreenContainer: React.ComponentType<
  RegisterScreenContainerProps
> = () => {
  const { getUser, setUser, setMessages, messages } = useUserInfo();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackRoutesList>>();

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('joinSuccess', async (u: User) => {
        const user = await getUser();
        if (!user) {
          setUser(u);
        }
        navigation.navigate(StackRoutes.CHATROOM, {
          firstName: u.name,
          lastName: u.surname,
        });
      });
      socket.on('newMessage', async (messages: Message[]) => {
        const user = await getUser();

        if (user) {
          setMessages(messages.filter(m => m.sentAt >= user.connectedAt));
        } else {
          setMessages([]);
        }

        const permissions = await checkPermissions();
        const appIsInBackground =
          AppState.currentState === 'background' ||
          AppState.currentState === 'inactive';

        // We are handling foreground notifications, but anyway
        // we don't want to display them in this scenario.
        if (permissions && appIsInBackground) {
          const lastMessage = messages.pop();
          if (
            lastMessage &&
            lastMessage.deviceId !== DeviceInfo.getDeviceId()
          ) {
            sendNotification({
              title: `${lastMessage.name} ${lastMessage.surname}`,
              body: lastMessage.message,
            });
          }
        }
      });
    });

    const retrievePrevState = async () => {
      let user = await getUser();
      if (user && messages && messages.length > 0) {
        socket.emit('joinChat', {
          name: user.name,
          surname: user.surname,
          deviceId: DeviceInfo.getDeviceId(),
        });
      }
    };

    retrievePrevState();

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [getUser, navigation, setMessages, setUser, messages]);

  const onJoinChat = (u: Partial<User>) => {
    socket.emit('joinChat', u);
  };

  return <RegisterScreen onJoinChat={onJoinChat} />;
};

export default RegisterScreenContainer;
