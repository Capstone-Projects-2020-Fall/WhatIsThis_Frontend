import _ from 'lodash';
import React, {Component} from 'react';
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';

import firebase, {firestore} from 'firebase';
import {firebaseConfig} from '../config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const today = new Date().toISOString().split('T')[0];

const todaysDate = new Date();
const UTCOffset =  todaysDate.getTimezoneOffset();
const dateToday = todaysDate;
const USA_EST_Offset = 5*60; //UTCOffset = 300

//dateToday.setMinutes(dateToday.getMinutes() - USA_EST_Offset);
todaysDate.setMinutes(todaysDate.getMinutes() - USA_EST_Offset);

// Convert long date format (Sat Nov 14 2020...) to ISO date format (2020-11-14...)
//const todayEST = new Date(dateToday).toISOString().split('T')[0]; 
const todayEST = new Date(todaysDate).toISOString().split('T')[0];

console.log("Today in UTC: " + today);
console.log("UTC Offset: " + UTCOffset);
console.log("Today in EST: " + todayEST + "\n\n");


const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, todayEST].concat(futureDates);
const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';


function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + (864e5 * index)); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - (864e5 * days)).toISOString().split('T')[0];
}

// Pass in the date, something like 11/24/2020 or whatever format that works
// then return the index number for that day for the date array.
/*function countDates(days){
  
  return indexDay;
}*/

/**
 * The ITEMS array holds the events
*/

const ITEMS = [
  {title: dates[0], data: [{name: 'Bench Press'}]},
  {title: dates[1], data: [{name: 'Bent Over Row'}, {name: 'Bicep Curl with Dumbbells'}]},
  {title: dates[2], data: [{name: 'Bicep Curls with Barbell'}, {name: 'Chin Ups'}, {name: 'Crunches'}]},
  {title: dates[3], data: [{name: 'Cycling'}]},
  {title: dates[4], data: [{name: "Deadlift"}]},
  {title: dates[5], data: [{name: 'Dips Between Two Benches'}, {name: 'Front Squats'}, {name: 'Jogging'}, {name: 'Kettlebell Clean & Press'}]},
  {title: dates[6], data: [{name: 'Lateral Raises'}]},
  //{title: dates[7], data: [{}]},
  {title: dates[7], data: [{name: 'Leg Press'}]},
  {title: dates[8], data: [{name: 'Leg Press(wide)'}, {name: 'Leg Raises, Lying'}, {name: 'Pull Ups'}, {name: 'Squats'}]},
  {title: dates[9], data: [{name: 'Bench Press'}, {name: 'Bent Over Row'}, {name: 'Chin Ups'}]},
  {title: dates[10], data: [{ name: 'Deadlift'}]}
];

/*
const eventArrExercise = ITEMS.map(events => {
  events.title,
  events.data.map(itemEvent=> {itemEvent.name});
});
console.log(eventArrExercise);
*/
const valuesOfITEMS = ITEMS.values();

//console.log(valuesOfITEMS.next().value.title);
//console.log("\n");
//console.log(valuesOfITEMS.next().value);
//console.log("ITEMS values:\n");
//console.log(valuesOfITEMS.next());
for(let valueITEMS of valuesOfITEMS){
  console.log(valueITEMS);
}
/*
const eventArrExercise = ITEMS.map(events => {
  //console.log(events.title),
  events.title,
  events.data.map(itemEvent=> {
    //console.log(itemEvent.name);
    itemEvent.name
  });
});*/

function parseArray(arrayOfMap){
  
  
  return parsedArray;
}



console.log("\n\n");
console.log();

let names = ITEMS.reduce((str, itemEvents) => `${str} ${itemEvents.name}`, '||');
//console.log(names);
/*
const authors = [ { id: 1, name: 'Steven'}, {id: 2, name: 'Nick'}]
let names = authors.map( (a, i) => `${a.name} is cool`).join(' ');
console.log(names);
*/

const workoutList = new Array();

function buildArray(eventsArray){
  ITEMS.forEach(itemEvent => {
    if(itemEvent.data[0].name.includes('First Yoga')){
        //muscleExerciseList.push(exercise.name, "\n\n",exercise.description, "\n\n\n");
        workoutList.push(itemEvent.data[0].name, "\n\n");
    }
  })
  console.log(workoutList);
  return workoutList;
  //return console.log(workoutList);
}

buildArray(ITEMS);

console.log("\n\nhello world \n\n")

//console.log(eventArrExercise);
function retrieveEventsFromUserDatabase(){

  return console.log("Retreive user information");
}


function addEventsToFirestore(eventsArray){
  //const user =  firebase.auth().currentUser;
  //const workoutEvents = [];
  //var index = 0;
  //for (index = 0; index < eventsArray.length; index++) { 
    //console.log(eventsArray[index]); 
    //console.log(eventsArray[index][0]);
  //}
  
// Checking the current user's ID. 
// The document names are user ID in the user database in FireStore. 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User is signed in.\n");
      console.log("Current User ID: " + user.uid);
      firestore().collection('user').doc(user.uid).update({
        workoutEvents: firebase.firestore.FieldValue.arrayUnion("2020-11-15||Bench Press")});
    } else {
      // No user is signed in.
      console.log("No user is signed in.\n");
    }
  }); 
  
  return console.log("\n\n Added event to user's database \n\n");
}


function removeEventsFromFirestore(eventsArray) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User is signed in.\n");
      console.log("Current User ID: " + user.uid);
      firestore().collection('user').doc(user.uid).update({
        workoutEvents: firebase.firestore.FieldValue.arrayRemove("2020-11-15||Bench Press")});
    } else {
      // No user is signed in.
      console.log("No user is signed in.\n");
    }
  }); 
  return console.log("\n\n Added event to user's database \n\n");
}


addEventsToFirestore(ITEMS);

removeEventsFromFirestore(ITEMS);




export default class ExpandableCalendarScreen extends Component {

  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  }

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  }

  buttonPressed() {
    Alert.alert('show more');
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(item.name)}
        style={styles.item}
        
      >
      
    <Text style={styles.itemTitleText}>{item.name}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Info'} onPress={this.buttonPressed}/>
        </View>
      </TouchableOpacity>
    );
  }

  getMarkedDates = () => {
    const marked = {};
    ITEMS.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
        //console.log("\n\n" + item.title + "\n\n");
      } else {
        marked[item.title] = {disabled: true};
        //console.log("\n\n" + item.title + "\n\n");
      }
    });
    return marked;
  }

  getTheme = () => {
    const disabledColor = 'grey';

    return {
      // arrows
      arrowColor: 'black',
      arrowStyle: {padding: 0},
      // month
      monthTextColor: 'black',
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: 'black',
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: 'white',
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: 'white',
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2}
    };
  }

  render() {
    return (
      <CalendarProvider
        date={ITEMS[0].title}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        // theme={{
        //   todayButtonTextColor: themeColor
        // }}
        // todayBottomMargin={16}
      >
        
        {this.props.weekView ?
          <WeekCalendar
            
            firstDay={1}
            markedDates={this.getMarkedDates()}
          /> :
          <ExpandableCalendar
            
            // horizontal={false}
            // hideArrows
            // disablePan
            // hideKnob
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.calendar} // for horizontal only
            // disableWeekScroll
            // theme={this.getTheme()}
            disableAllTouchEventsForDisabledDays
            firstDay={1}
            markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
            //leftArrowImageSource={require('../img/previous.png')}
            //rightArrowImageSource={require('../img/next.png')}
          />
        }
        <AgendaList
          sections={ITEMS}
          extraData={this.state}
          renderItem={this.renderItem}
          // sectionStyle={styles.section}
        />
      </CalendarProvider>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize'
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  }
});