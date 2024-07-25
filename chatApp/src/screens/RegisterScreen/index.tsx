import React, { useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  ImageBackground,
} from 'react-native';
import User from '../../models/User';
import styles from './styles';
import DeviceInfo from 'react-native-device-info';
import consts from '../../constants/consts';
import colors from '../../constants/colors';

interface RegisterScreenProps {
  onJoinChat: (user: Partial<User>) => void;
}

const RegisterScreen: React.ComponentType<RegisterScreenProps> = ({
  onJoinChat,
}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const deviceId = DeviceInfo.getDeviceId();

  return (
    <ImageBackground source={consts.backgroundImage} style={styles.imagebg}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          onChangeText={setFirstName}
          value={firstName}
          style={styles.textInput}
        />
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          onChangeText={setLastName}
          value={lastName}
          style={styles.textInput}
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                !!firstName && !!lastName ? colors.wine : colors.wine02,
            },
          ]}
          disabled={!firstName || !lastName}
          onPress={() => {
            onJoinChat({ name: firstName, surname: lastName, deviceId });
          }}>
          <Text style={styles.inputLabel}>Join chat</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;
