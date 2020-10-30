import React, { Component } from 'react';
import { Button, View, Text, Alert, List } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {firestore} from 'firebase';
import {getExerciseArrayFromFirestore, returnExerciseList, getEvents} from './helpers';


const ExerciseList 