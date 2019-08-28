import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCM8-ntamEuIgK6Ufs5TucG-LCyoovgXNE',
    authDomain: 'window-creator.firebaseapp.com',
    databaseURL: 'https://window-creator.firebaseio.com',
    projectId: 'window-creator',
    storageBucket: '',
    messagingSenderId: '603410015110',
    appId: '1:603410015110:web:d03636c97ec8f6f4',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
