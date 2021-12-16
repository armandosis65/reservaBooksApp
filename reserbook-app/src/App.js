import React, { useEffect } from 'react';
import "./App.css";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebase_config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { ProfileImage } from './components/ProfileImage';
import { 
    Box, Flex, Heading, 
     Button, HStack,
    VStack, useColorMode, useColorModeValue,
   } from '@chakra-ui/react';
import { useUser } from './Providers/UserProvider';
import { MainMenu } from './components/MainMenu';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MyBooks } from './components/MyBooks';
  

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);


export const App = () => {
  const { toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue('gray.200', 'gray.700');
  const { user, setUser } = useUser();

  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(`Welcome ${result.user.displayName}`);
        setUser({
          name: result.user.displayName,
          userImage: result.user.photoURL,
        });
      })
      .catch(error => {
        setErrorMessage(error.message);
      })
  };


  useEffect(() => {
    console.log(`Welcome user ${ user.name }`);
  }, [user]);

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      const user = auth.currentUser;

      if (user) {
        setUser({
          name: user.displayName,
          userImage: user.photoURL,
        });
      }
      
    })
  }, []);


  return (
    <Router>

    
     <main>
      <header className="container main-header"> 
        <MainMenu />
        
      </header>
      
        <Switch>

          <Route path="/" exact>

      
            <Flex height='100vh' justifyContent='center' alignItems='center' >
      
        
              <Box maxW='xs' bg={backgroundColor} p={6} borderRadius='md'>
  
        
          
                <HStack justify='center' spacing='10'>
          
            
                  <Heading size='lg' mb={3}>
             
                    Log In
            
                  </Heading>

                  { user.name  &&<ProfileImage />};
                  
          
                </HStack>
        
         
                <VStack mt='5' variant='outline' justify='center'>
          
            
                  <Button colorScheme='blue' onClick={toggleColorMode}>
              
                    Dark Mode
            
                  </Button>
         
           
                  <div className="card container sign-in-card" >
              
                    <Button className="sign-in-button" onClick={handleGoogleSignIn} colorScheme='green'>
              
                      Login with Google
              
                      {errorMessage && <div className="error">{errorMessage}</div>}
             
                    </Button>
            
                  </div>
          
                </VStack>
        
        
              </Box>
      
            </Flex>
          
          </Route> 
          
          
          < Route path="/new-books">
            <section>
              <div> <Link to="new-books"> <MyBooks/> </Link> </div>
            </section>

          </Route>

          <ProtectedRoute path="/my-books">
          
            <section className="container">
              <Link to="my-books"> <MyBooks/> </Link>
            </section>

          </ProtectedRoute>

          <Route>
            <div className="container"> Page not found</div>
          </Route>

      </Switch>
      </main>
    </Router>
  );
}