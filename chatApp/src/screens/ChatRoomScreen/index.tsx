import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AppState,
  FlatList,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import socket from '../../constants/socket';
import styles from './styles';
import MessageBubble from './components/MessageBubble';
import { RouteProp, useRoute } from '@react-navigation/native';
import StackRoutes, { StackRoutesList } from '../../navigation/routes';
import Icon from '../../components/Icon';
import notifications, {
  checkPermissions,
  requestPermissions,
} from '../../notifications';

export interface Message {
  name: string;
  surname: string;
  message: string;
  deviceId: string;
  sentAt: Date;
}

interface ChatRoomScreenProps {
  chatMessages: Message[];
}

const ChatRoomScreen: React.ComponentType<ChatRoomScreenProps> = ({
  chatMessages,
}) => {
  const {
    params: { firstName, lastName },
  } = useRoute<RouteProp<StackRoutesList, StackRoutes.CHATROOM>>();
  const deviceId = DeviceInfo.getDeviceId();
  const ref = useRef<any>();
  const [message, setMessage] = useState<string>('');
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(false);
  const Separator = useCallback(() => <View style={styles.separator} />, []);
  const [appState, setAppState] = useState(AppState.currentState);

  const handleSubmit = () => {
    socket.emit('sendMessage', {
      name: firstName,
      surname: lastName,
      message,
      deviceId,
    });
    setMessage('');
    ref.current?.scrollToEnd();
  };

  useEffect(() => {
    ref.current?.scrollToEnd();
  }, [chatMessages]);

  useEffect(() => {
    const handleAppStateChange = async (
      nextAppState: SetStateAction<
        'active' | 'background' | 'inactive' | 'unknown' | 'extension'
      >,
    ) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        try {
          const enabled = await notifications.checkPermissions();
          setNotificationsEnabled(enabled);
        } catch (e: any) {
          console.log('Error retrieving notitfication status', e);
          setNotificationsEnabled(false);
        }
      }
      setAppState(nextAppState);
    };

    const sub = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      sub.remove();
    };
  }, [appState]);

  useEffect(() => {
    const getPermissionStatus = async () => {
      const permission = await checkPermissions();
      setNotificationsEnabled(permission);
    };

    getPermissionStatus();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/bg1.jpg')}
      style={styles.imagebg}>
      <SafeAreaView style={styles.container}>
        <FlatList
          contentContainerStyle={styles.flatlistContainer}
          ref={ref}
          data={chatMessages}
          ItemSeparatorComponent={Separator}
          renderItem={MessageBubble}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: 'pink',
              height: 45,
              width: 45,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => requestPermissions()}>
            <Icon
              name={notificationsEnabled ? 'bell' : 'disabledBell'}
              size={30}
              color={'black'}
            />
          </TouchableOpacity>
          <TextInput
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ChatRoomScreen;
