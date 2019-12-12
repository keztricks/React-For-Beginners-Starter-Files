import Rebase from "re-base";
import Firebase from "firebase";

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyBlNgG4vD2X6txRsWRdI5L87HNfja2fhHY",
    authDomain: "catch-of-the-day-697e0.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-697e0.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
