import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import {firebase} from '../../firebase/config';

export default function Reg({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState ('');
    
    const onRegistrationPress = () => {
        //ToastAndroid.show("Never gonna give you up! Never gonna let you down!", ToastAndroid.SHORT);
        if(email == '' || password == '' || confirmPass == ''){
            alert("Please enter all the info")
            return
        }
        if(password !== confirmPass){
            alert("Passwords do not match")
            return
        }

        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then( (response) => 
        
            {
                const uid = response.user.uid;
                console.log(uid);
                const data = {
                    id : uid,
                    email,
                };
                
                const usersRef = firebase.firestore().collection('users');
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() =>{ navigation.navigate('HomeScreen').catch( (error) => {alert(error)}); }
                        );
            }        
            
        
        
        )
        .catch( (error) => {
            alert(error);
            
        });

        ToastAndroid.show("Account Created Successfully!", ToastAndroid.SHORT);
        navigation.navigate("Login");






    };

    const onFooterLinkPress = () => {
        navigation.navigate('Login');
    };


  return (
    <View style={styles.regform}>
      <Text style = {styles.header}>Sign Up</Text>
      
      <TextInput style ={styles.textinput} 
        placeholder = "Email" 
        placeholderTextColor = "#0a0505"
        onChangeText = {(text) => setEmail(text)}
        value = {email}
      
      
      
      />

      <TextInput style = {styles.textinput} 
        placeholder = "Password" 
        secureTextEntry = {true} 
        placeholderTextColor = "#0a0505"
        onChangeText = {(text) => setPassword(text)}
        value = {password}

      
      />

      <TextInput style = {styles.textinput} 
        placeholder = " Confirm Password" 
        secureTextEntry = {true} 
        placeholderTextColor = "#0a0505"
        onChangeText = {(text) => setConfirmPass(text)}
        value = {confirmPass}

      />

      <TouchableOpacity style = {styles.button} onPress = {() => onRegistrationPress()}>

            <Text>Sign Up</Text>

      </TouchableOpacity>

      <View style={styles.footerView}>
            <Text style={styles.footerText}>Already got an account? </Text>
            <Text onPress={onFooterLinkPress} style={styles.footerLink}> Log in</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  regform: {
    alignSelf: 'stretch',
    paddingBottom: 190,
    backgroundColor: 'dodgerblue',
    margin: 0

  },
  header: {
      fontSize : 24,
      color: '#fff',
      paddingBottom: 10,
      margin: 50,
      borderBottomWidth : 1,

  },
  textinput: {
      alignSelf : 'stretch',
      height: 40,
      marginBottom: 30,
      borderBottomWidth : 1,
      borderBottomColor : '#f8f8f8',

  },

container: {
    flex: 1,
    alignItems: 'center'
},
title: {

},
logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30
},
input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
},
button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
},
buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
},
footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    marginRight: 40
},
footerText: {
    fontSize: 16,
    color: '#2e2e2d',
    marginLeft: 25,
    
},
footerLink: {
    color: "#0a0505",
    fontWeight: "bold",
    fontSize: 16,
    width: 150,
    paddingLeft: 50,
  
    
}
});