import { StyleSheet } from 'react-native';
import colors from '../../../../constants/colors';

export default StyleSheet.create({
  message: {
    padding: 16,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fromMe: {
    fontWeight: 'bold',
    textAlign: 'right',
    color: colors.white,
    width: '85%',
  },
  fromOther: {
    textAlign: 'left',
    color: colors.white,
    width: '85%',
  },
  whoCircle: {
    height: 34,
    width: 34,
    borderRadius: 50,
    backgroundColor: colors.white05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whoText: { color: colors.white, fontWeight: 'bold' },
});
