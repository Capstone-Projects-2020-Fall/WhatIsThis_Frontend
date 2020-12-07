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
  Modal,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import firebase, {firestore} from 'firebase';
import {firebaseConfig} from '../config';
import ExerciseModal from '../ExerciseModal';

class RecommendationScreen extends Component {	
	constructor(props){
		super(props);
		
		this.state = {
			exercises: [],
			recentWorkouts: [],
			isVisible : true,
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
	
	displayModal(){
		const {isVisible} = this.state
		this.setState({isVisible: !isVisible})
	}

    render() {	
		const {exercises} = this.state;
		const {recentWorkouts} = this.state;
		const recentExercises = [];
		const unusedExercises = [];
		const dates = [];
		
		function returnUnusedExercise (){
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
			
			return unusedExercises[Math.floor(Math.random()*unusedExercises.length)];
		}
		
		function returnExerciseInfo(){
			const chosenExercise = returnUnusedExercise();
			exercises.forEach(exercise =>{
				if(exercise.name = chosenExercise) return exercise;
			});
		}

        return (
			<View style={{ flex: 1 }}>
				<Modal
				  animationType = {"slide"}
				  transparent = {true}
				  visible = {this.state.isVisible}
				  onRequestClose = {() => {
					{this.displayModal()}
				  }}
				>

					<TouchableOpacity
					  style = {styles.modalContainer}
					  activeOpacity= {1}
					  onPressOut={() => {this.displayModal()}}
					>
					  <TouchableWithoutFeedback>
						<View style ={styles.modalView}>
						  <ExerciseModal  name={"Bench Press"} description={"Test"} image={"https://firebasestorage.googleapis.com/v0/b/fir-react-native-b2fff.appspot.com/o/diagrams%2Fbench.png?alt=media&token=22438c6f-7e1b-40bf-83db-5a43479f1036"}/>
						  
						 
						  <TouchableOpacity style={styles.button} onPress={() => {
							  this.displayModal()
							}}>
							  <Text style={styles.buttonText}>Close</Text>
						  </TouchableOpacity>
						</View>
					  </TouchableWithoutFeedback>
					</TouchableOpacity>

				</Modal>
			</View>  
        );
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraArea : {
    flex: 1,
    margin: 10
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
    padding: 1,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#00bfff',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20
  }
})

export default RecommendationScreen;