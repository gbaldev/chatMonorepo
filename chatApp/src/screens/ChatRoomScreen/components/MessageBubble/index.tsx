/* eslint-disable no-bitwise */
import React from 'react';
import { ListRenderItem, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import colors from '@constants/colors';
import Message from '@models/Message';
import styles from './styles';

const MessageBubble: ListRenderItem<Message> = ({ item }) => {
  const deviceId = DeviceInfo.getDeviceId();
  const itsMe = item.deviceId === deviceId;

  const stringToRGBA = (str: string) => {
    // Convert the string to a hash
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to RGB values
    const r = (hash >> 16) & 0xff;
    const g = (hash >> 8) & 0xff;
    const b = hash & 0xff;

    // Return the RGBA color string
    return `rgba(${r}, ${g}, ${b}, 0.3)`;
  };

  return (
    <View
      style={[
        styles.message,
        {
          backgroundColor:
            item.deviceId === deviceId ? colors.grayBlue03 : colors.wine03,
        },
      ]}>
      {!itsMe && (
        <View
          style={[
            styles.whoCircle,
            { backgroundColor: stringToRGBA(item.name + item.surname) },
          ]}>
          <Text style={styles.whoText}>
            {item.name[0].toUpperCase() + item.surname[0].toUpperCase()}
          </Text>
        </View>
      )}
      <Text
        style={item.deviceId === deviceId ? styles.fromMe : styles.fromOther}>
        {item.message}
      </Text>
      {itsMe && (
        <View
          style={[
            styles.whoCircle,
            { backgroundColor: stringToRGBA(item.name + item.surname) },
          ]}>
          <Text style={styles.whoText}>ME</Text>
        </View>
      )}
    </View>
  );
};

export default MessageBubble;
