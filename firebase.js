import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCWdJZY6-dl_flmW6aXA6yahc1Yd6G8dIc",
  authDomain: "fir-auth-embs.firebaseapp.com",
  projectId: "fir-auth-embs",
  storageBucket: "fir-auth-embs.appspot.com",
  messagingSenderId: "36686209163",
  appId: "1:36686209163:web:01d2bd5537dd43185e748e"
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { firebase ,auth};