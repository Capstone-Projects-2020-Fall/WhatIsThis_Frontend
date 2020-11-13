import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import {Container, Content, Header, Input, Item, Button, Label, Form} from 'native-base';
import DismissKeyboard from '../DismissKeyboard'
class SignUpScreen extends Component {
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
            console.log(error.toString())
        }
    }
    render(){
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
                        onPress={()=>this.signUpUser(this.state.email, this.state.password)}
                    >
                    <Text style={{color: "white"}}>Sign Up</Text>
                    </Button>
                    <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate('LoginScreen')}>
                        <Text>Already have an account?</Text>
                    </TouchableOpacity>
                </Form>   
            </Container>
            </DismissKeyboard>

    }
}
export default SignUpScreen;

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