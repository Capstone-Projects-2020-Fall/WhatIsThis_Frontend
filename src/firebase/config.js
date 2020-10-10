import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCPSeidZCEHWXsA7IsztUiB4_idum27lC8',
  authDomain: 'https://fir-react-native-b2fff.firebaseio.com',
  databaseURL: 'https://fir-react-native-b2fff.firebaseio.com',
  projectId: 'fir-react-native-b2fff',
  storageBucket: 'fir-react-native-b2fff.appspot.com',
  messagingSenderId: '',
  appId: '1:491143214913:android:1ace677f9994e86fcc13c0',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };