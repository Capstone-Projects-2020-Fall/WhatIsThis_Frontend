// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, Alert, Image, ImageBackground, Modal, TouchableOpacity, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {firestore, storage} from 'firebase';
import {testReturn, getExerciseArrayByMuscle, getExerciseArrayFromFirestore, returnExerciseList, returnMuscleExerciseList} from '../helpers';

/*
//import {workoutInfoByMachine,workoutInfoByMuscle} from '../helpers';
export default class MuscleSelectorScreen extends Component {
  constructor(props){
    super(props)
    this.state = ({
        muscleID: ""
    })
  }
  //muscleID="biceps brachii"
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Muscle Selector</Text>
        <Button style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        title="Biceps"
        //onPress={() => Alert.alert("BICEPS CURL")}
        onPress={() => testReturn('biceps brachii')}
      />
      </View>
    )
  }
}*/


class MuscleSelectorScreen extends Component {
  
  constructor(props){
		super(props);
		
		this.state = {
      exercises: [],
			exerciseDiagramURL: [],
			  isVisible : false,
			  formalName: "blank" 
		};
	}
	
	
	

  // hide show modal
  displayModal(show){
    this.setState({isVisible: show})
  }

  displayModalMod(show, chosenMuscle){
    this.setState({isVisible: show})
    this.setState({formalName: chosenMuscle})
    // console.log(this.num)
    // console.log(this.isVisible)
  }
  
  componentDidMount(){
	  
    
 const imageURLList = new Array();
	  
  let queryRef = firestore()
          
					.collection('exercises')
					.get()
					.then(querySnapshot => {
						const data = querySnapshot.docs.map(doc => doc.data());
						data.forEach(exercise => {
							
							if(exercise.imgpath !== undefined){
								var storageRef = storage().ref(exercise.imgpath);
								storageRef.getDownloadURL().then(url => {
                  imageURLList.push(url);
                  //console.log(url);
                 
								});							
							}
						});
						
						this.setState({exercises: data});
            this.setState({exerciseDiagramURL: imageURLList});
            
					});
	
				
  }

  
  

  render() {
    const {exercises} = this.state;
    const {exerciseDiagramURL} = this.state;
		//console.log(exercises[0]);
		const exerciseNames = new Array();
    const exerciseDes = new Array();
    const exerciseMuscle = new Array();
    const exerciseMachine = new Array();
    var testArray = [
      "https://firebasestorage.googleapis.com/v0/b/fir-react-native-b2fff.appspot.com/o/diagrams%2Frunning.png?alt=media&token=f3139617-afd3-4403-be53-95ca186b863e",
      "https://firebasestorage.googleapis.com/v0/b/fir-react-native-b2fff.appspot.com/o/diagrams%2Fbicep_curls_dumbbell.jpg?alt=media&token=0e3c03ca-c0e2-42dd-8540-12a687dfb825",
      "https://firebasestorage.googleapis.com/v0/b/fir-react-native-b2fff.appspot.com/o/diagrams%2Fcycling.png?alt=media&token=fa9ec058-5ac7-4938-8981-6af59647fa6d",
      "https://firebasestorage.googleapis.com/v0/b/fir-react-native-b2fff.appspot.com/o/diagrams%2Fbench.png?alt=media&token=22438c6f-7e1b-40bf-83db-5a43479f1036",
      "https://firebasestorage.googleapis.com/v0/b/fir-react-native-b2fff.appspot.com/o/diagrams%2Fbent_over_row_barbell.png?alt=media&token=a49c124f-6c1d-4be8-a3b4-faede31eb7e5",
      "https://firebasestorage.googleapis.com/v0/b/fir-react-native-b2fff.appspot.com/o/diagrams%2Fpullup.png?alt=media&token=7903b9f3-ac98-4cec-b2d6-560a1d92f3f0",
      "https://firebasestorage.googleapis.com/v0/b/fir-react-native-b2fff.appspot.com/o/diagrams%2Fsquat.png?alt=media&token=20205192-f6f1-4cd7-86ea-45913841f855",
      "https://firebasestorage.googleapis.com/v0/b/fir-react-native-b2fff.appspot.com/o/diagrams%2Fleg_raise.png?alt=media&token=394f2fb1-6e2a-4591-9fe9-2a7f2f61a295",
      "https://firebasestorage.googleapis.com/v0/b/fir-react-native-b2fff.appspot.com/o/diagrams%2Fkb_clean_and_press.png?alt=media&token=82fcd651-50b4-426b-9164-e75684b097a5",
      "https://firebasestorage.googleapis.com/v0/b/fir-react-native-b2fff.appspot.com/o/diagrams%2Fleg_press.png?alt=media&token=fe0d41e2-8467-483d-95c0-f59eed7b9d08",
    ];

    const muscleExerciseList = new Array();
    function buildArray(muscleID){
      exercises.forEach(exercise => {
        if(exercise.muscle.includes(muscleID)){
            muscleExerciseList.push(exercise.name, "\n\n",exercise.description, "\n\n\n");
			
        }
      })
      return muscleExerciseList;
    }

    // Remove this 
    
    
    function buildImages(muscleID){
      console.log(exerciseDiagramURL);
      return exerciseDiagramURL;
    }
    
    const exerciseImageList = new Array()
    // For each muscle, search for exactly one exercise 
    function buildImages(muscleID){
      /*
      exerciseDiagramURL.forEach(exercise => {
        if(exercise.muscle.includes(muscleID)){
            muscleExerciseList.push(exercise.name, "\n\n",exercise.description, "\n\n\n");
      
        }
      })
      */
      // How to do a normal, non arrow notation for-each; doesn't exist, actually 
      
      testArray.forEach(image => {
        
        if(image.search("bench") && muscleID == "pectoralis major"){
          exerciseImageList.push(image); 
          console.log(image); 
        }
        // console.log(image);
        
        // exerciseImageList.push(image); 

        /*
        if(image.search("jogging") && muscleID == "gastrocnemius"){
          exerciseImageList.push(image); 
        }
        */
      })
      
      return exerciseImageList;
    }

    
    
    /**
    var res = [];
    map.forEach(function(val, key) {
      res.push({ region: key, value: val });
    });
     */
		
    return (
      <View contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}>
        <Modal
            animationType = {"slide"}
            transparent={true}
            visible={this.state.isVisible}
            onRequestClose={() => {
              //Alert.alert('Modal has now been closed.');
              //onRequestClose={() => {this.setModalVisible(false)}}
              {this.setModalVisible(false)
            }}
            }          
            >

            <ScrollView>
            <TouchableOpacity 
            style={styles.container} 
            activeOpacity={1} 
            onPressOut={() => {this.displayModal(false)}}
          >
            
            <TouchableWithoutFeedback>
                
                <View style={styles.modalView}>
                <Text 
                style={styles.modelText}
                
              >
             
                {buildArray(this.state.formalName)}
                
                
              </Text>
              
              
                </View>
              
              </TouchableWithoutFeedback>

            
              <Image
              
              style = {styles.image}
              source ={buildImages(this.state.formalName)}
              
             
              />


              <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.displayModal(false)
                  }}>
                  <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            </ScrollView>
          </Modal>
            <ScrollView>
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "rectus abdominus");
              }}>
              <Text style={styles.buttonText}>Abs</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "biceps brachii");
              }}>
              <Text style={styles.buttonText}>Biceps</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "gastrocnemius");
              }}>
              <Text style={styles.buttonText}>Calves</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "anterior deltoid");
              }}>
              <Text style={styles.buttonText}>Deltoids</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "gluteus maximus");
              }}>
              <Text style={styles.buttonText}>Glutes</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "latissimus dorsi");
              }}>
              <Text style={styles.buttonText}>Lats</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "pectoralis major");
              }}>
              <Text style={styles.buttonText}>Pectorals</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.displayModalMod(true, "quadriceps femoris");
              }}>
              <Text style={styles.buttonText}>Quadriceps</Text>
          </TouchableOpacity>
              </ScrollView>
        </View>
        
      );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: { 
      height: 10, 
      width: 0 
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  modelText: {
    fontSize: 14,
    marginBottom: 10,
    padding: 1,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});

export default MuscleSelectorScreen;
