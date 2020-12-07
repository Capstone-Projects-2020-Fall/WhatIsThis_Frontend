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
			toDisplay: {},
			isVisible : false,
			formalName: "blank"
		};
	}
	
		
	returnUnusedExercise(){
		const recentExercises = [];
		const unusedExercises = [];
		const dates = [];
		const {recentWorkouts} = this.state;
		const {exercises} = this.state;
		
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
		const randomChoice = unusedExercises[Math.floor(Math.random()*unusedExercises.length)];
		return randomChoice;
	}
		
	buildExerciseObj= () =>{
		const {exercises} = this.state;
		let exerciseObj = {};
		const chosenExercise = this.returnUnusedExercise();
		console.log(chosenExercise);
		exercises.forEach(exercise =>{
			if(exercise.name == chosenExercise) {
				exerciseObj = {name: exercise.name, description: exercise.description, image: exercise.imgurl}; 
				this.setState({toDisplay: exerciseObj});
				return;
			}
		});
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
		const {toDisplay} = this.state;
		
        return (
			<View style={{ flex: 1 }}>
				<Text style={styles.headertext}>Based on your recent workouts:</Text>
				<TouchableOpacity style={styles.openbutton} onPress={() => {
					this.buildExerciseObj()
					this.displayModal()
				}}>
					<Text style={styles.buttonText}>Get Recommendation</Text>
				</TouchableOpacity>
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
							<ExerciseModal  name={toDisplay.name} description={toDisplay.description} image={toDisplay.image}/>
						 
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
  headertext: {
	color: '#000000',
    fontSize: 16,
	marginLeft: 80,
	marginTop: 250,
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
	alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00bfff',
  },
  openbutton: {
	width: 300,
	marginLeft: 50,
	marginTop: 20,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
	alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00bfff',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20
  }
})

export default RecommendationScreen;