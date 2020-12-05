import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native'

const Name = (props) =>{
    return (
        <Text style={styles.text}> {props.name} </Text>
    );
}

const Description = (props) => {
    return (
        <Text style ={styles.description}> {props.description} </Text>
    );
}

const ImageURL = (props) => {
    const image = props.image
    console.log()
    return (
        <Image
            style={styles.image}
            source = {{
                uri: image
            }}
        />
    );
}

const ExerciseModal = (props) => {
    return (
        <View style={styles.modalView}>
            <Name name={props.name}/>
            <Description description={props.description}/>
            <ImageURL image={props.image} />
        </View>
    );
}

export default ExerciseModal;

const styles = StyleSheet.create({
    text: {
        fontSize: 18
    },
    description: {
        fontSize: 14
    },
    image: {
        width: 200,
        height: 200
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
    }
})