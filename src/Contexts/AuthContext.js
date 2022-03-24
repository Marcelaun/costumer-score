import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [user, setUser] = useState('');
  
  const auth = getAuth();
  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth ,(user) => {

      if(user) {
        

      const { displayName, uid, email} = user;
      console.log(displayName, uid, email)
      
        setUser ({
          id: uid,
          name: displayName,
          email,
        })

       
      }
      


      
    })

    return () => {
      unsubscribe();
    }
  },[auth.currentUser, auth]);



async function logInWithEmailAndPassword(userData) {
  const auth = getAuth();
  

return await signInWithEmailAndPassword(auth, userData.email, userData.password)
.then((userCredential) => {

  const user = userCredential.user;
  console.log(user)
  setUser(user);

})



}

async function logOutAccount() {

  const auth = getAuth();
  const userCurrentState = await auth.currentUser;

  if(userCurrentState !== null) {
    await signOut(auth);
    setUser(undefined);
  } else
  if(userCurrentState === null) {
    throw new Error("User already is logged out!");
  }

}

// userCredential de logInWithEmailAndPassword

// .then((userCredential => {
//   const { photoURL, uid, displayName, email } = userCredential.user;
//   console.log('userCredentials', userCredential.user);
  
   //  setUser({
   //   avatar: photoURL,
   //   id: uid,
   //   displayName,
   //   email,
   // })
// }))




    return (
        <AuthContext.Provider value={{ user, logInWithEmailAndPassword, logOutAccount }}>
            {props.children}
        </AuthContext.Provider>
    );


}