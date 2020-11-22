import React, { Component, useState } from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import NativeForms from 'native-forms';

class SurveyScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                    <NativeForms
                        form="https://my.nativeforms.com/Ydnd20jZm4WTNBDVy0Db"
                    />
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', 
        justifyContent: 'center',
    },
})

export default SurveyScreen;