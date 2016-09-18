
import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  backgroundImage:{
    width: 100,
    height: 100,
  },
  title: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    top: 15,
  },
  subtitle: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: 22,
    top: 70,
  },
  paragraph: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontSize: 15,
    top: 70,
  },
  regSubtitle: {
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    top: 180,
  },
  regParagraph: {
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    top: 140,
  },
  backgroundImage:{
    flex: 1,
    resizeMode: 'stretch',
  },
  modalSubtitle:{
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#4cdc94',
    fontWeight: 'bold',
    fontSize: 30,
    top: 40,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
    paddingTop: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    alignSelf: 'center',
    marginTop: 5,
    padding: 3,
    borderWidth: 0.5,
    borderColor: '#777777',
  }
});
