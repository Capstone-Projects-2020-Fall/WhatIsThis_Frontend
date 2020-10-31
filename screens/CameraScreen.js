// Aboutscreen.js
import React, { Component , useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import { Button, View, Text , TouchableOpacity, StyleSheet, Platform} from 'react-native';
import { createStackNavigator, createAppContainer, withNavigationFocus, NavigationEvents} from 'react-navigation';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { CAMERA } from 'expo-permissions';
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import { Toast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

export default class CameraScreen extends Component {

  state = {
    hasPermission : null,
    type: Camera.Constants.Type.back,
    loaded: true

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
  async componentDidMount(){
    // const{status} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    // this.setState({hasPermission : status === 'granted'});
    this.getPermissionAsync();
  }
  state = {loaded : true};
  
  takePicture = async () =>{
    
    if(this.camera){
      let photo = await this.camera.takePictureAsync();
      console.log(photo)
    }
  }

  pickImage = async() => {
    let image = await ImagePicker.launchImageLibraryAsync(
      {mediaTypes: ImagePicker.MediaTypeOptions.Images}
    )
    console.log(image)
  }

  render() {
    
    const{hasPermission} = this.state;
    const {loaded} = this.state;

    if(hasPermission == null){
      return <View></View>
    }else if(hasPermission == false){
      return <Text>Please give access to camera to take picture of equipment</Text>
    }else{
      return (
          <View style={{ flex: 1 }}>
            
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
  cameraArea : {
    flex: 1,
    margin: 10
  }
})