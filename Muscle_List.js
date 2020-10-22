/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, ScrollView } from 'react-native';

class ScrollViewExample extends Component {
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
                        <Text>{item.name}</Text>
                     </View>
                  ))
               }
            </ScrollView>
         </View>
      )
   }
}
export default ScrollViewExample

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
})