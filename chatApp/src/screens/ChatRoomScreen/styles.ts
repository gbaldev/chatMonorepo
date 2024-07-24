import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  input: {
    backgroundColor: 'white',
    flexGrow: 1,
    marginHorizontal: 10,
    borderRadius: 25,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 16,
  },
  button: {
    width: '20%',
    backgroundColor: 'pink',
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
    color: 'white',
  },
  separator: {
    height: 10,
  },
  imagebg: { flex: 1 },
  flatlistContainer: { paddingBottom: 100 },
});
