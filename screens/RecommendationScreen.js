import _ from 'lodash';
import React, {Component} from 'react';
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import firebase, {firestore} from 'firebase';
import {firebaseConfig} from '../config';



class RecommendationScreen extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			exercises: [],
			recentExerciseList: [],
			isVisible : false,
			formalName: "blank" 
		};
	}
	
	componentDidMount(){
	
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				// User is signed in.
				firestore()
					.collection('user')
					.doc(user.uid)
					.get("workoutEvents")
					.then(docSnapshot => {
						console.log(docSnapshot);
					});
			} else {
				// No user is signed in.
				console.log("No user is signed in.\n");
			}
		});
		
		let queryRef = firestore()         
					.collection('exercises')
					.get()
					.then(querySnapshot => {
						const data = querySnapshot.docs.map(doc => doc.data());
						this.setState({exercises: data});
					});
		
	}
	
	
	
	
    render() {
		
		const {exercises} = this.state;
		const {recentExerciseList} = this.state;
		const unusedExercises = [];
		
		function buildArray (){
			exercises.forEach(exercise =>{
				if (!recentExerciseList.includes(exercise.name)){
					unusedExercises.push(exercise.name);
				}
			});
			
		}
		
		
        return (
			<View>
				<Text>
					Hello World!
				</Text>
			</View>
           
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', 
        justifyContent: 'center',
    },
});

export default RecommendationScreen;