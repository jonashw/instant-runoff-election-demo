import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const envOrDie = (variableName) => {
    let fullVariableName = 'REACT_APP_FIREBASE_' + variableName;
    if(!(fullVariableName in process.env)){
        throw new Error('Expected an env variable to be defined but it was not: ' + fullVariableName);
    }
    return process.env[fullVariableName];
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = Object.fromEntries([
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
    "measurementId"
].map(k => [k, envOrDie(k)]));
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const ExampleElectionMap = {
    fromDb: (d) => ({
      id: d.id,
      name: d.name,
      ballots: d.ballots.map((b) => b.split('|'))
    }),
    toDb: (se) => ({
      name: se.name,
      ballots: se.ballots.map(b => b.join('|'))
    })
  };

export async function getExampleElections(){
    let docs = await getDocs(collection(db, "example-elections"));
    let docData = docs.docs.map(d => ({id: d.id, ...d.data()}));
    //console.log(docData);
    return docData.map(ExampleElectionMap.fromDb);
}