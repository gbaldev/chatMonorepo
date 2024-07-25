import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import RegisterScreen from '../../screens/RegisterScreen';
import { useUserInfo } from '../../contexts/UserInfo/context';
import User from '../../models/User';
import socket, { SocketEvents } from '../../constants/socket';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import StackRoutes, { StackRoutesList } from '../../navigation/routes';
import { checkPermissions, sendNotification } from '../../notifications';
import Message from '../../models/Message';

interface RegisterScreenContainerProps {}

const RegisterScreenContainer: React.ComponentType<
  RegisterScreenContainerProps
> = () => {
  const { getUser, setUser, setMessages, messages } = useUserInfo();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackRoutesList>>();

  useEffect(() => {
    socket.on('connect', () => {
      socket.on(SocketEvents.JOIN_SUCCESS, async (u: User) => {
        const user = await getUser();
        if (!user) {
          setUser(u);
        }
        navigation.navigate(StackRoutes.CHATROOM, {
          firstName: u.name,
          lastName: u.surname,
        });
      });
      socket.on(SocketEvents.NEW_MESSAGE, async (_messages: Message[]) => {
        const user = await getUser();

        if (user) {
          setMessages(_messages.filter(m => m.sentAt >= user.connectedAt));
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
          const lastMessage = _messages.pop();
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
        socket.emit(SocketEvents.JOIN, {
          name: user.name,
          surname: user.surname,
          deviceId: DeviceInfo.getDeviceId(),
        });
      }
    };

    retrievePrevState();

    return () => {
      socket.off(SocketEvents.CONNECT);
      socket.off(SocketEvents.DISCONNECT);
    };
  }, [getUser, navigation, setMessages, setUser, messages]);

  const onJoinChat = (u: Partial<User>) => {
    socket.emit(SocketEvents.CONNECT, u);
  };

  return <RegisterScreen onJoinChat={onJoinChat} />;
};

export default RegisterScreenContainer;
