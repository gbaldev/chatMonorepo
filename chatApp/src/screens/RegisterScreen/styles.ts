import { StyleSheet } from 'react-native';
import colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
  },
  textInput: {
    margin: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white01,
    borderRadius: 25,
    height: 50,
    width: '90%',
    color: colors.white,
  },
  inputLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagebg: { flex: 1 },
});
