import { StyleSheet } from 'react-native';

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
  disconnected: {
    height: 24,
    width: 24,
    borderRadius: 50,
    backgroundColor: '#aa1100',
  },
  connected: {
    height: 24,
    width: 24,
    borderRadius: 50,
    backgroundColor: 'green',
  },
  textInput: {
    margin: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 25,
    height: 50,
    width: '90%',
    color: 'white',
  },
  inputLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagebg: { flex: 1 },
});
