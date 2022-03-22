import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [user, setUser] = useState('');
  const [ loginError, setLoginError ] = useState('');
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth ,(user) => {
      console.log('user em useeffect authstateachanged', user);

      if(user) {
        setLoginError('noError');
        

      const { displayName, uid, email} = user;
      
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
  },[]);



async function logInWithEmailAndPassword(userData) {
  const auth = getAuth();
  

await signInWithEmailAndPassword(auth, userData.email, userData.password)
.then((userCredential) => {

  const user = userCredential.user;
  setUser(user);

})
.catch((error) => {




  if(error) {
    console.log('erro login', error)
    setLoginError(error.code);
  } 
  

  

  

  

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
        <AuthContext.Provider value={{ user, logInWithEmailAndPassword, loginError, logOutAccount }}>
            {props.children}
        </AuthContext.Provider>
    );


}