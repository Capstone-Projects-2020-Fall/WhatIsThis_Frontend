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
        paddingBottom: 5,
        fontSize: 18,
        fontWeight: 'bold'
    },
    description: {
        paddingTop: 5,
        paddingBottom:5,
        fontSize: 14
    },
    image: {
        width: 250,
        height: 200
    },
    modalView: {
        paddingTop:30,
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        }
    }
})