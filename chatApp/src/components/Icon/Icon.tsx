import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import DisabledBell from './DisabledBell';
import Bell from './Bell';

export const IconMap = {
  disabledBell: DisabledBell,
  bell: Bell,
};

interface Props {
  style?: StyleProp<ViewStyle>;
  name: keyof typeof IconMap;
  size?: number;
  focused?: boolean;
  color?: string;
  horizontal?: boolean;
}

const Icon: React.FC<Props> = ({
  style,
  name,
  size = 24,
  focused = true,
  color,
  ...props
}) => {
  const IconComponent = IconMap[name];

  return (
    <IconComponent
      style={style}
      size={size}
      focused={focused}
      color={color}
      {...props}
    />
  );
};

export default Icon;
