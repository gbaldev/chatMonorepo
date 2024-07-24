import { StyleSheet } from 'react-native';

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
    color: 'white',
    width: '85%',
  },
  fromOther: {
    textAlign: 'left',
    color: 'white',
    width: '85%',
  },
  whoCircle: {
    height: 34,
    width: 34,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whoText: { color: 'white', fontWeight: 'bold' },
});
