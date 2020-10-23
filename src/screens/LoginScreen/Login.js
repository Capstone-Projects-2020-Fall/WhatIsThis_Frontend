import { firestore } from 'firebase';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import {firebase} from '../../firebase/config'
import {workoutInfoByMachine} from '../../../helpers'

function Login({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFooterLinkPress = () =>{
        navigation.navigate('Registration')
		

    }

    const onLoginPress = () => {
        //ToastAndroid.show("All your base are belong to us", ToastAndroid.SHORT);
        //navigation.navigate('HomeScreen')
        firebase.
            auth().
                    signInWithEmailAndPassword(email, password)
                    .then(  (response) => {
                        const uid = response.user.uid;
                        const usersRef = firebase.firestore().collection('users');
                        usersRef.doc(uid).get()
                                .then( firestoreDocument => {
                                    if(!firestoreDocument.exists){
                                        alert('User does not exist')
                                        return
                                    }
                                    const user = firestoreDocument.data() 
                                    navigation.navigate('HomeScreen')
                                })
                                .catch(error => {alert(error)}); 


                    }


                    ).catch(error => { alert(error)})
        
    };

    return(
    <View style = {styles.LoginForm}>
        <Text style = {styles.loginHeader}>Login</Text>

        <TextInput  style = {styles.textInput} placeholder = 'Email' 
            placeholderTextColor = '#0a0505'
            onChangeText = {(text) => setEmail(text)}
            value = {email}

        /> 

        <TextInput style = {styles.textInput}  
            placeholder = 'Password' 
            placeholderTextColor = '#0a0505'
            secureTextEntry
            onChangeText = {(text) => setPassword(text)}
            value = {password}
        
        
        />

        <TouchableOpacity style = {styles.button} onPress = {() => onLoginPress()}>
            
            <Text >Log In</Text>
        </TouchableOpacity>


        <View style={styles.footerView}>
            <Text style={styles.footerText}>Don't have an account?  </Text>
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text>
        </View>

    </View>

    )
    
    

}


const styles = StyleSheet.create({
    loginForm : {
        alignContent : 'stretch',
        paddingTop: 190,
    },
    loginHeader : {
        fontSize :  30,
        paddingLeft : 0,
        paddingRight: 25,
        paddingTop : 50,
        paddingBottom: 0,
        marginTop: 50,
        marginBottom: 0,
        marginLeft : 0,
        marginRight : 50,
        borderBottomWidth: 1,
    
    },

    textInput : {
        alignContent: 'stretch',
        paddingLeft : 0,
        paddingRight: 25,
        paddingTop : 25,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 10,
        marginLeft : 0,
        marginRight : 50,
        borderBottomWidth: 1,
        


    },

    button : {
        alignSelf : 'stretch',
        alignItems : 'center',
        padding : 20,
        backgroundColor : '#fff7fa'
    },

    buttonText : {
       alignItems : 'center',
       fontSize : 35, 
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
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16,
        width: 150,
        paddingLeft: 40,
      
        
    }
    
    

});



export default Login;