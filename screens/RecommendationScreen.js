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
			recentWorkouts: [],
			isVisible : false,
			formalName: "blank" 
		};
	}
	
	componentDidMount(){
		firebase
		.auth()
		.onAuthStateChanged(user => {			
			firestore()
				.collection('user')
				.doc(user.uid)
				.get()
				.then(docSnapshot => {
					const workoutData = docSnapshot.get("workoutEvents");
					this.setState({recentWorkouts: workoutData});
				});		
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
		const {recentWorkouts} = this.state;
		const recentExercises = [];
		const unusedExercises = [];
		const dates = [];
		
		function buildArray (){
			recentWorkouts.forEach(workout =>{
				const parsed = workout.split("||");
				dates.push(parsed[0]);
				parsed.forEach((parsedExercise,index) => {
						if(index == 0) return;
						recentExercises.push(parsedExercise);
				});
			});
			
			exercises.forEach(exercise => {
				if(!recentExercises.includes(exercise.name)){
					unusedExercises.push(exercise.name);
				}
			});
			
			return recentExercises;
		}

        return (
			<View>
				<Text>
					Hello World!
					{console.log(buildArray())}
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