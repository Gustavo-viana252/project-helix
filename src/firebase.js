import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCmXpDmn5RG7GTv_jsMA_4HqGfZ8aKvuX8",
  authDomain: "project-helix-31798.firebaseapp.com",
  projectId: "project-helix-31798",
  storageBucket: "project-helix-31798.firebasestorage.app",
  messagingSenderId: "895632051299",
  appId: "1:895632051299:web:1566b29057c0bb65b6bc56",
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)