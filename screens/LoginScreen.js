import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import {Container, Content, Header, Input, Item, Button, Label, Form} from 'native-base';
import DismissKeyboard from '../DismissKeyboard'
class LoginScreen extends Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }


    onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            );
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential).then(function(){
                console.log('User signed in.')
                if(result.additionalUserInfo.isNewUser){
                    firebase
                    .database
                    .ref('/users/' + result.user.uid)
                    .set({
                        gmail: result.user.email,
                        first_name: result.additionalUserInfo.profile.given_name,
                        last_name: result.additionalUserInfo.profile.family_name,
                        create_at: Date.now() 
                    })
                }else{
                    firebase
                        .database()
                        .ref('/users/' + result.user.uid).update({
                            last_logged_in: Date.now()
                        })
                }
                
            })
            
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
      }


    signInWithGoogleAsync = async() => {
        try {
          const result = await Google.logInAsync({
            //behavior:"web",
            androidClientId: '870205563550-5u6voh4jpq89002thptsbqhe3sg9auv3.apps.googleusercontent.com',
            iosClientId: '870205563550-d3jabnatdh7b6a4ugkgicor2nfb0imsa.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
    }

    constructor(props){
        super(props)

        this.state = ({
            email: "",
            password: ""
        })
    }

    signUpUser = (email, password) => {
        try{
            
            if(this.state.password.length<6){
                alert("Please enter at least 6 characters.")
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email, password)
        }
        
        catch(error){
            //console.log(error.toString())
            alert(error.toString())
        }
    }
    
   /*signUpUser = (email, password) => {
        try{
                
            if(this.state.password.length<6){
                alert("Please enter at least 6 characters.")
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email, password).then((user) =>{
                user.sendEmailVerification()
                handleStatusMessage(AUTH_SUCCESS)
            }).catch((error)=>{
                log.console(error.toString())
            })
        }
        
        catch(error){
            console.log(error.toString())
        }
   }*/



    loginUser = (email, password) => {
        try{
            firebase.auth().signInWithEmailAndPassword(email, password).then(function (user){
                console.log(user)
            })
        }
        catch(error){
            console.log(error.toString())
        }
    }

    render() {
        return (
            <DismissKeyboard>
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input 
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({email})}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input 
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(password) => this.setState({password})}
                        />
                    </Item>
                    <Button style={{marginTop: 10}}
                        full
                        rounded
                        primary
                        onPress={()=>this.loginUser(this.state.email, this.state.password)}
                    >
                    <Text style={{color: "white"}}>Log In</Text>
                    </Button>
                    <Button style={{marginTop: 10}}
                        full
                        rounded
                        primary
                        onPress={()=>this.signUpUser(this.state.email, this.state.password)}
                    >
                    <Text style={{color: "white"}}>Sign Up</Text>
                    </Button>
                    <TouchableOpacity style={styles.googleButton} onPress={()=>this.signInWithGoogleAsync()}>
                        <Text>Sign on with Google.</Text>
                    </TouchableOpacity>
                </Form>   
            </Container>
            </DismissKeyboard>
            
        );
    }
}

 /*<Button style={{marginTop: 10}}
                        full
                        rounded
                        primary
                        onPress={()=>this.signUpUser(this.state.email, this.state.password)}
                    >

                    <Text style={{color: "white"}}>Sign Up</Text>
                    </Button>*/
/*
<View style={styles.container}>
    <Button title='Sign on with Google' onPress={()=>this.signInWithGoogleAsync()}/>

</View>
*/
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    googleButton: {
        alignItems: 'center',
        marginTop: 10,
    },
});