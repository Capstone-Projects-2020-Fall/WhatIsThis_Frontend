// Aboutscreen.js
import React, { Component , useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import { Button, View, Text , TouchableOpacity, StyleSheet, Platform, Alert, ToastAndroid, AlertIOS, Modal, ScrollView, TouchableWithoutFeedback, Image} from 'react-native';
import { createStackNavigator, createAppContainer, withNavigationFocus, NavigationEvents} from 'react-navigation';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { CAMERA } from 'expo-permissions';
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import { Toast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import {firestore} from 'firebase';
import ExerciseModal from '../ExerciseModal';
export default class CameraScreen extends Component {

  state = {
    hasPermission : null,
    type: Camera.Constants.Type.back,
    loaded: true,
    exercises: [],
    isVisible: false,
    exerciseModalList: [],
  }
 
  async componentDidMount(){
    const{status} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    this.setState({hasPermission : status === 'granted'});
    // this.getPermissionAsync();
    let queryRef = firestore()
      .collection('exercises')
      .get()
      .then(querySnapshot => {
        const exerciseData = querySnapshot.docs.map(doc => doc.data());
        this.setState({exercises: exerciseData})
      })
  }

  getPermissionAsync = async () => {
    if(Platform.OS === 'ios'){
      const { status } = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL);
      if(status !== 'granted'){
        alert('Please allow the app to use the camera')
      }
    }else{
      const{status} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
      this.setState({hasPermission : status === 'granted'});
    }
  }

  takePicture = async () =>{
    
    if(this.camera){
      // var photo = await this.camera.takePictureAsync();
      // console.log(photo);
      // MediaLibrary.saveToLibraryAsync(photo.uri);
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 0,
        base64: true,
      })
      Alert.alert('Picture Selection', 'Use this picture?', [
        {
          text: 'Yes',
          onPress: () => this.communicateWithServer(image)
        },
        {
          text: 'No',
          onPress: () => this.cancelledPicSelected()
        }
      ])
    }
  }

  communicateWithServer = (image)  =>{
      fetch("http://whatisthisbackend.us-east-2.elasticbeanstalk.com/predict", {
        method: "POST",
        headers:{
          Accept: "application/json",
          'Content-Type': "application/json",
        },
        body: JSON.stringify({
          imgsource: image.base64
        }),
      })
      .then(response => response.json())
        .then(responseJson => {
          let equipment = responseJson.equipment
          let probability = responseJson.probability
          console.log(equipment)
          console.log(probability)
          this.processEquipmentResponse(equipment, probability)
        })
        .catch((error) => {
          console.error('Error: ', error);
        });
  }

  cancelledPicSelected = () =>{
    var msg = "Pictured Not Selected. Please pick another one"
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG)
    } else {
      Alert.prompt("Selection cancelled. Choose another.");
    }
    
  }

  pickImage = async() => {
    var image = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images, base64: true})
    if(!image.cancelled){
      Alert.alert('Picture Selection', 'Use this picture?', [
        {
          text: 'Yes',
          onPress: () => this.communicateWithServer(image)
        },
        {
          text: 'No',
          onPress: () => this.cancelledPicSelected()
        }

      ])
    }
  }

    //Process the data received from the response from the server in the event a picture is taken
  processEquipmentResponse= (equipment, probability) => {
    //Check if the probability is greater than a certain amount?
    const {exercises, exerciseModalList, isVisible} = this.state;

    let exerciseList = []
    let modalList = []
    let nameList = []
    
    //Realistically, this should be refactored into an exercise class whcih should then be
    //pushed into the array. The class should contain the 
    //various fields. This would make it much cleaner and better practice. If time allows, refactor
    //this here and in muscleselectorscreen

    exercises.forEach(exercise => {
      if(exercise?.machine?.includes(equipment) && !nameList.includes(exercise.name)){
        nameList.push(exercise.name)
        exerciseList.push({name: exercise.name, description: exercise.description, image: exercise.imgurl})
      }
    })
    // console.log(exerciseList)
    // modalList = exerciseList.map((exercise, key) => {
    //   <ExerciseModal key={key} name={exercise.name} description={exercise.description} image={exercise.image}/>
    // })

    this.setState({
      isVisible: !isVisible,
      exerciseModalList: [...exerciseModalList, ...exerciseList]
    })
  }

  displayModal(){
    const {isVisible} = this.state
    this.setState({isVisible: !isVisible})
  }

  render() {
    
    const{hasPermission, loaded, exerciseModalList} = this.state;

    console.log(exerciseModalList[0]?.image)

    if(hasPermission == null){
      return <View></View>
    }else if(hasPermission == false){
      return <Text>Please give access to camera to take picture of equipment</Text>
    }else{
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
              <ScrollView>
                <TouchableOpacity
                  style = {styles.modalContainer}
                  activeOpacity= {1}
                  onPressOut={() => {this.displayModal()}}
                >
                  <TouchableWithoutFeedback>
                    <View style ={styles.modalView}>
                      {exerciseModalList.map((exercise, key) => {
                        return <ExerciseModal key={key} name={exercise.name} description={exercise.description} image={exercise.image}/>
                      })}
                     
                      {/* <Image
                        style={{width: 200, height: 200}}
                        source = {{
                            uri: exerciseModalList[0]?.image
                        }}
                      /> */}
                      <TouchableOpacity style={styles.button} onPress={() => {
                          this.displayModal()
                        }}>
                          <Text style={styles.buttonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </TouchableOpacity>
              </ScrollView>
            </Modal>

            <NavigationEvents onWillFocus={payload => this.setState({loaded: true})} onDidBlur={payload => this.setState({loaded: false})}/>
            {loaded && <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => {this.camera = ref;}}>
                      <View style ={{flex: 1, flexDirection: "row", justifyContent:'space-between', margin: 30}}>

                        <TouchableOpacity onPress ={()=> this.pickImage()}
                          style = {{alignSelf: 'flex-end', alignItems : 'center', backgroundColor : 'transparent',}} >
                          <Ionicons name = 'ios-photos' style = {{color: '#fff', fontSize : 40}}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.takePicture()}
                          style = {{alignSelf: 'flex-end', alignItems : 'center', backgroundColor : 'transparent',}}>
                          <FontAwesome name = 'camera' style = {{color: '#fff', fontSize : 40}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style = {{alignSelf: 'flex-end', alignItems : 'center', backgroundColor : 'transparent',}}>
                          <MaterialCommunityIcons name = 'camera-switch' style = {{color: '#fff', fontSize : 40}}/>
                        </TouchableOpacity>
                
                      </View>
                    </Camera>}
          </View>
        
      );
   }
  }
}



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
    backgroundColor: '#2AC062',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20
  }
})