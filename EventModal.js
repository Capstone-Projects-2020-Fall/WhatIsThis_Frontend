import 
{ 
    Button, 
    View, 
    Text, 
    Alert, 
    Modal, 
    TouchableOpacity, 
    StyleSheet, 
    TouchableHighlight, 
    TouchableWithoutFeedback, 
    ScrollView 
} from 'react-native';
import {Component} from 'react'


export default class EventModal extends Component {
    render() {
      return (
        <Modal
          visible = {this.props.visible}
          animationType="slide"
          transparent
          onRequestClose={() => {}} >
             <TextInput 
               style = {styles.inputBox}
               onChangeText={(changedText) => this.props.onInputChanged(changedText)} />
        </Modal>
      )
    }
  }