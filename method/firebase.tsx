// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';


const projectId = 'galleryst-f7fe1'

const firebaseConfig =  {
  apiKey: "AIzaSyDJZIsW9h3qHeyQFaRyvycH3NFpED-YtFU",
  authDomain: `${projectId}.firebaseapp.com`,
  projectId: projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: "238070777772",
  appId: "1:238070777772:web:f2b589dd01a9c3960e9c09",
  measurementId: "G-18KXBB9L16",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err: any){
  console.error('Firebase initialization error', err.stack)
  // if (!/already exists/.test(err.message)) {
  //   console.error('Firebase initialization error', err.stack)
  // }
}
const fire = firebase;

export const findbyAddress = async (doc: string, address: string) => {
  const db = fire.firestore().collection(doc).doc(address)
  return await db.get()
}

export const getAllUser = async() => {
  const db = fire.firestore().collection('creatorParcel')
  const documents = await db.get()
  return documents.docs.map(doc => {
    return doc.data()
  })
}

export const findDocument = async (doc: string, shortUrl: string, rules: string) => {
  const db = fire.firestore().collection(doc).where(rules,'==',shortUrl)
  return await db.get()
}

export const writeDocument = async (doc: string, address: string, parcel: any) => {
  const db = firebase.firestore().collection(doc).doc(address)
  await db.set(JSON.parse(JSON.stringify(parcel)))
}

export const updateDocument = async (doc: string, address: string, parcel: any) => {
  const db = firebase.firestore().collection(doc).doc(address)
  await db.update(parcel)
}

export const uploadFile = async (file: any) => {
  const storage = fire.storage();
  const storageRef = storage.ref("create-profile");
  try{
    const response : any = await storageRef.child(file.name).put(file);
    // alert("Successfully uploaded picture!");
    const fullPath : string = response['_delegate']['metadata']['fullPath']
    const imagePath = `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/${encodeURIComponent(fullPath)}?alt=media`
    return { status: true , imagePath }
  }catch(e){
    console.log("error", e);
    return { status: false }
  }
}

export default fire;



