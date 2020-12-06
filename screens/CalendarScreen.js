import _, { forEach } from 'lodash';
import React, {Component} from 'react';
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';

import firebase, {firestore} from 'firebase';
import {firebaseConfig} from '../config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Original today data variable -> UTC -> EST (Philly)
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

const todayESTMMDDYYYY = "12/05/2020";

function formatDate(todayESTMMDDYYYY){
  var formattedTodayEST = "";
  todayFormatArray = todayESTMMDDYYYY.split("/");
  formattedTodayEST = todayFormatArray[2] + "-" + todayFormatArray[0] + "-" + todayFormatArray[1]
  return formattedTodayEST;
}
var formatTodayEST = formatDate(todayESTMMDDYYYY);
console.log("FORMAT DATE: " + formatTodayEST);


const pastDate = getPastDate(3);
//console.log(pastDate)
const futureDates = getFutureDates(9);
const dates = [pastDate, todayEST].concat(futureDates);
//console.log(dates)

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


const items = [];


function parseArray(arrayOfMap){
  
  
  return parsedArray;
}



console.log("\n\n");
console.log();


//This would have to be an array of an array of objects.
//Have an array of objects that the events get stored when creating them 


//const exerciseArray = [
//  ["Running", "Bench Press"], 
//  ["Leg Press", "Deadlift"]
//];

//const dateArray = ["2020-11-29", "2020-12-01"];

const dateStr1 = "2020-12-01";
const exerciseArray1 = ["Running", "Bench Press"];
const dateStr2 = "2020-12-03";
const exerciseArray2 = ["Leg Press", "Deadlift"];
//const exerciseArray = ["Leg Press", "Deadlift"]
const emptyExerciseStr = "";
//{title: dates[1], data: [{name: 'Bent Over Row'}, {name: 'Bicep Curl with Dumbbells'}]}
function addEventToArray(eventArray,date,exercise) {
  //console.log("\n\naddEventToArray\n");
  //for(var i = 0; i < exerciseArray.length; i++){
    //console.log("var i: " + i);
    //eventArray.push({title: date, data: [{name: exerciseArray[i]}]});
    //console.log("eventArray[" + i + "]")
  //}
  eventArray.push({title:date, data:[{name:exercise}]})
  addEventsToFirestore(eventArray);
  console.log(eventArray);
  return eventArray;
}


//printAddEventToArray(items, date, exerciseArray);
const eventsItems = [];

var removedResult;
const resultArray = [];
const arrayEvents = [
  {
    title: "2020-12-25", 
    data: [
      {
        name: 'Cycling'
      }, 
      {
        name: 'Deadlift'
      }
    ]
  }
  ];


console.log("Using values() function:");
const valueOfEvents = arrayEvents.values();
for(let eventValues of valueOfEvents){
  console.log(eventValues);
}
console.log("Using JSON stringify:");
const stringJSONEvents = JSON.stringify(arrayEvents); 
console.log("stringJSONEvents: " + stringJSONEvents);

console.log("\nStringify JSON, remove name object, then use values():");



var ar = [{"value":"14","label":"7"},{"value":"14","label":"7"},{"value":"18","label":"7"}];
console.log("ar length BEFORE splice: " + ar.length);
for(var i=0; i < ar.length; i++) {
   if(ar[i].value == "14" && ar[i].label == "7")
   {
      var arrayAR = ar.splice(i,1);
   }
}
console.log("\nar length AFTER splice: " + ar.length);
console.log("\nar: " + JSON.stringify(ar));
console.log("ar[1]: " + ar[1].value);
const valuesOfAr = ar.values();
for(let arValues of valuesOfAr){
  console.log(arValues);
}
const workoutEvents =[
  {
    title: "2020-11-30", 
    data: [
      {name: 'Bent Over Row'}, 
    ]
  },
  {
    title: "2020-12-03",
    data: [
      {name: 'Running'},
    ]
  }
]; 

const dateString = "2020-12-03";
const exerciseName = "Deadlift";

// Iterate through the array of events and pop of the exercise e.g. {name: "Running"}
function removeEventFromArray(eventArray,dateString,exerciseName){
  removeEventsFromFirestore(eventArray);
  //removeEventsFromFirestore(eventArray);
  console.log("\n\nREMOVE EVENT FUNCTION\n")
  for(var i=0; i < eventArray.length; i++){
    //for(var j=0; j <workoutEvents[i].data.length; j++){
    if(eventArray[i].title === dateString && eventArray[i].data[0].name === exerciseName){
      console.log("Getting match date: " + eventArray[i].title);
      console.log("Getting match exercise: " + eventArray[i].data[0].name);
      eventArray.splice(i,1);
      
    }
    
  }
  addEventsToFirestore(eventArray)
  console.log(JSON.stringify(eventArray));
  //addEventsToFirestore(eventArray);
  console.log()
  console.log("\n\n");
  return eventArray;
}

//items = addEventToArray(items, dateArray, exerciseArray);



function addEventsToFirestore(eventsArray){
const delimArray = jsonToArrayDelimiter(eventsArray); 
  
// Checking the current user's ID. 
// The document names are user ID in the user database in FireStore. 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User is signed in.\n");
      console.log("Current User ID: " + user.uid);
      firestore().collection('user').doc(user.uid).update({
        workoutEvents: firebase.firestore.FieldValue.arrayUnion(...delimArray)});
    } else {
      // No user is signed in.
      console.log("No user is signed in.\n");
    }
  });
  return console.log("\n\n Added event to user's database \n\n");
}





function removeEventsFromFirestore(eventsArray) {
  const delimArray = jsonToArrayDelimiter(eventsArray); 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User is signed in.\n");
      console.log("Current User ID: " + user.uid);
      firestore().collection('user').doc(user.uid).update({
        workoutEvents: firebase.firestore.FieldValue.arrayRemove(...delimArray)});
    } else {
      // No user is signed in.
      console.log("No user is signed in.\n");
    }
  }); 
  return console.log("\n\n Added event to user's database \n\n");
}


const workoutEventsFirestore =[
  {
    title: "2020-11-30", 
    data: [
      {name: 'Bent Over Row'}
    ]
  },
  {
    title: "2020-12-03",
    data: [
      {name: 'Running'}
    ]
  }
];

function jsonToArrayDelimiter(eventArray){
  const delimArray = [];
  var eventString = "";
  //console.log("\n\njsonToArrayDelimiter function\n");
  //console.log("Length of eventArray: " + eventArray.length)
  for(var i=0; i < eventArray.length; i++){
    
    //console.log("var i = " + i);
    //console.log("event array date: " + eventArray[i].title);
    //if(eventArray[i].title){
    eventString = eventArray[i].title
    //}
    //console.log("event array data length: " + eventArray[i].data.length);


    for(var j =0; j < eventArray[i].data.length; j++){
      eventString = eventString + '||' + eventArray[i].data[j].name
      
      //console.log("event array exercises " + eventArray[i].data[j].name)
      //console.log(eventString)
      //console.log("var j = " + j);
      delimArray.push(eventString);
    }
    //console.log(eventString)
    //delimArray.push(eventString);
  }
  //console.log(delimArray);
  return delimArray;
}

function printSimpleArray(simpleArray){
  console.log("\n\nprintSimpleArray function\n");
  for(var i = 0; i < simpleArray.length; i++){
    console.log(simpleArray[i]);
  }
}

//const delimArray = jsonToArrayDelimiter(workoutEventsFirestore);
//printSimpleArray(delimArray);
//addEventsToFirestore(workoutEventsFirestore);


export default class ExpandableCalendarScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isVisible: false,
      dateForm: null,
      exerciseForm: null,
      incorrectDate: false
    };
  }
  
  displayModal(){
    const {isVisible} = this.state
    this.setState({
      isVisible: !isVisible
    })
  }

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

    console.log(JSON.stringify(item))
    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(item.name)}
        style={styles.item}
        /*ITEMS = [{title: date}, data:{name: "Running"}] */
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
    const datesMarked = [];

    items.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
        console.log("\n\n" + item.title + "\n\n");
      } else {
        marked[item.title] = {disabled: true};
        //console.log("\n\n" + item.title + "\n\n");
      }
    });
    console.log("MARKED DATESA" + marked)
    return marked;
  }
  
  
  items = addEventToArray(items, todayEST, emptyExerciseStr);
  //items = addEventToArray(items, dateArray, exerciseArray);
  //items = addEventToArray(items, dateStr1, exerciseArray1);

  //items = addEventToArray(items, dateStr2, exerciseArray2);

  //items = removeEventFromArray(items, dateString, exerciseName);
  

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

  
 handleExerciseForm = (text) => {
   //Gonna have to overwrite state. Try inputing 'barbell' then doing so again, but leaving exercise field blank
  this.setState({
    exerciseForm: text
  });
}

handleDateForm =(text) =>{
  this.setState({
    dateForm: text
  });
}

submitForm =() => {
  const {dateForm, exerciseForm, isVisible} = this.state

  var dateRegex = RegExp(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/) 

  let correctDate = dateRegex.test(dateForm)

  if(correctDate && exerciseForm.length != 0){
      //DATE FORM CONVERSION HERE AND CAKL THE NECESSARY METHODS NEEDED TO DISPLAY THE NEW EXERCISE/DATA ANd also store it in firsetore
    var formatDateString = formatDate(dateForm);
    Alert.alert(
      'Accepted',
      exerciseForm + " added on " + dateForm,
      [
        {text: "OK", onPress : () => console.log("Date and exercise added")}
      ]
    )
    //HERE ADD/DISPLAY
    // Maybe use this.items?
    addEventToArray(items, formatDateString, exerciseForm);
    this.displayModal()
  }
  else {
  
    Alert.alert(
      "Incorrect Date",
      "Sorry, please enter the date in the MM/DD/YYYY format",
      [
        {text: "OK", onPress : () => console.log("Wrong date entered")}
      ]
    )
  }
}

deleteForm = () => {
  const {dateForm, exerciseForm} = this.state

  var dateRegex = RegExp(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/) 

  let correctDate = dateRegex.test(dateForm)

  if(correctDate && exerciseForm.length != 0){

    var formatDateString = formatDate(dateForm);
    Alert.alert(
      'Deleted',
      exerciseForm + " deleted on " + dateForm,
      [
        {text: "OK", onPress : () => console.log("Date and exercise added")}
      ]
    )
    //HERE ADD/DISPLAY
    // Maybe use this.items?
    removeEventFromArray(items, formatDateString, exerciseForm);
    this.displayModal()
  }
  else {
  
    Alert.alert(
      "Incorrect Date",
      "Sorry, please enter the date in the MM/DD/YYYY format",
      [
        {text: "OK", onPress : () => console.log("Wrong date entered")}
      ]
    )
  }
}

  render() {
    const {isVisible} = this.state
    return (
      <CalendarProvider
        date={items[0].title}
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
          sections={items}
          extraData={this.state}
          renderItem={this.renderItem}
          // sectionStyle={styles.section}
        />
        <Modal
       animationType = {"slide"}
       transparent={true}
       visible={isVisible}
       onRequestClose={() => {
         //Alert.alert('Modal has now been closed.');
         //onRequestClose={() => {this.setModalVisible(false)}}
         {this.displayModal()
         }}
        }          
        >
          <ScrollView contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>
            <TouchableOpacity 
              style={styles.container} 
              activeOpacity={1} 
              onPressOut={() => {this.displayModal()}}>
            <TouchableWithoutFeedback>
           
           <View style={styles.modalView}>
             <TextInput
              style = {styles.textInput}
              underlineColorAndroid = "transparent"
              placeholder = "Exercise"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleExerciseForm}/>
             
             <TextInput 
              style = {styles.textInput}
              underlineColorAndroid = "transparent"
              placeholder = "MM/DD/YYYY"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this.handleDateForm}/>
              <View>
                <TouchableOpacity style={styles.modalSubmitButton} onPress={() => {
                    this.submitForm()
                  }}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalDeleteButton} onPress={() => {
                    this.deleteForm()
                  }}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => {
                  this.displayModal()
                }}>
                  <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
           </View>
         </TouchableWithoutFeedback>
         </TouchableOpacity>
     </ScrollView>
   </Modal>
        <TouchableOpacity
          onPress={() => {
            console.log("CLICKING")
            this.displayModal()
          }}
          style={styles.viewTask}
        >
          <Image
            source={require('../assets/plus.png')}
            style={{
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
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
  },
  viewTask: {
    position: 'absolute',
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    //backgroundColor: '#2E66E7',
    backgroundColor: '#00acee',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    //shadowColor: '#2E66E7',
    shadowColor: '#00acee',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20
  },
  modalButton: {
    paddingTop: 15,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#00bfff',
    marginTop: 20,
    textAlign: 'center'
  },
  modalDeleteButton: {
    paddingTop: 15,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#dd0000',
    marginTop: 20,
    textAlign: 'center'
  },
  modalSubmitButton: {
    paddingTop: 15,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#008000',
    marginTop: 20,
    textAlign: 'center'
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
  textInput : {
    fontSize:22,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  },
});