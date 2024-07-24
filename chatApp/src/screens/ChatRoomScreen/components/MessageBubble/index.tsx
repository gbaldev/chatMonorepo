import React from 'react';
import styles from './styles';
import { ListRenderItem, Text, View } from 'react-native';
import { Message } from '../..';
import DeviceInfo from 'react-native-device-info';

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
            item.deviceId === deviceId
              ? 'rgba(144,175,197,0.3)'
              : 'rgba(118,54,38,0.3)',
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
