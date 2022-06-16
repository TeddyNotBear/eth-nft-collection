import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDhNN4rA2kv23OhVzNJPG09zmQ5mXc4koA",
    authDomain: "advancednft-57d56.firebaseapp.com",
    projectId: "advancednft-57d56",
    storageBucket: "advancednft-57d56.appspot.com",
    messagingSenderId: "211649071613",
    appId: "1:211649071613:web:0bed77dc24a8620ecdf194"
};

export const useFirestore = () => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const getSignature = async (address: string) => {
        try {
            const whitelistRef = doc(db, "whitelist", address);
            const whitelist = await getDoc(whitelistRef);
            if(!whitelist.exists()) return []
            
            return whitelist.data().signature;
        } catch (error) {
            return [];
        }
    }

    return { getSignature }
};