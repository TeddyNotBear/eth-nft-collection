const { initializeApp } = require("firebase/app");
const { getFirestore, setDoc, doc, getDoc } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyDhNN4rA2kv23OhVzNJPG09zmQ5mXc4koA",
    authDomain: "advancednft-57d56.firebaseapp.com",
    projectId: "advancednft-57d56",
    storageBucket: "advancednft-57d56.appspot.com",
    messagingSenderId: "211649071613",
    appId: "1:211649071613:web:0bed77dc24a8620ecdf194"
};

const app = initializeApp(firebaseConfig);
// get db instance of our app
const db = getFirestore(app);

const insertData = async (address, signature) => {
    try {
        // write in the collection
        const docRef = await setDoc(doc(db, 'whitelist', address), { signature });
    } catch (error) {
    }
}

const getSignature = async (address) => {
    try {
        const whitelistRef = doc(db, "whitelist", address);
        const whitelist = await getDoc(whitelistRef);
        if(whitelist.exists);
        
        return whitelist.data().signature;
    } catch (error) {
        return null;
    }
}

module.exports = insertData;