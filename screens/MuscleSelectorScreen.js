// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class MuscleSelectorScreen extends Component {
  state = {
    names: [
       {'name': 'Abs', 'id': 1},
       {'name': 'Biceps', 'id': 2},
       {'name': 'Calves', 'id': 3},
       {'name': 'Deltoids', 'id': 4},
       {'name': 'Glutes', 'id': 5},
       {'name': 'Hamstrings', 'id': 6},
       {'name': 'Lats', 'id': 7},
       {'name': 'Lower back', 'id': 8},
       {'name': 'Pectorals', 'id': 9},
       {'name': 'Triceps', 'id': 10},
       {'name': 'Quadriceps', 'id': 11},

    ]
 }

  render() {
    return (
      <View>
            <ScrollView>
               {
                  this.state.names.map((item, index) => (
                     <View key = {item.id} style = {styles.item}>
                        <TouchableOpacity
                          onPress={() => Alert.alert('Learn more about associated exercises here!')}
                          >
                          <Text>{item.name}</Text>
                        </TouchableOpacity>
                     </View>
                  ))
               }
            </ScrollView>
         </View>
    )
  }
}

const styles = StyleSheet.create ({
  item: {
      flexDirection: 'row',
      textAlign: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#fff0f5'
   }
});

/*
<ScrollView>
        <Text style={styles.baseText}>Abs</Text>
        <Text>Biceps</Text>
        <Text>Calves</Text>
        <Text>Deltoids</Text>
        <Text>Glutes</Text>
        <Text>Hamstrings</Text>
        <Text>Lats</Text>
        <Text>Lower back</Text>
        <Text>Pectorals</Text>
        <Text>Triceps</Text>
        <Text>Quadriceps</Text>
      </ScrollView>
*/

/*
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Muscle Group Selector</Text>
        <Button
          title="I don't do anything!"
          onPress={() => Alert.alert('Lies!')}/>
          
      </View>
*/