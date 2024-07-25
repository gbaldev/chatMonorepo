import colors from '@constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    flexGrow: 1,
    marginHorizontal: 10,
    borderRadius: 25,
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: 16,
  },
  button: {
    width: '20%',
    backgroundColor: colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 50,
  },
  container: {
    flex: 1,
    padding: 12,
  },
  inputContainer: {
    height: 70,
    paddingTop: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
  },
  separator: {
    height: 10,
  },
  imagebg: { flex: 1 },
  flatlistContainer: { paddingBottom: 100 },
  iconContainer: {
    backgroundColor: colors.pink,
    height: 45,
    width: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
