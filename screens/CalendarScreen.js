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


/*
Get the today's date with EST timezone. 
Used in the placeholder object in items array with empty string.
*/
const todayEST = new Date(todaysDate).toISOString().split('T')[0];


function formatDate(todayESTMMDDYYYY){
  var formattedTodayEST = "";
  todayFormatArray = todayESTMMDDYYYY.split("/");
  formattedTodayEST = todayFormatArray[2] + "-" + todayFormatArray[0] + "-" + todayFormatArray[1]
  return formattedTodayEST;
}

const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';


/*
The constant items array is the array that will hold the
event objects in the calendar.
  - Events pushed in will show up on the agenda list 
  - Events removed from the array will not be shown on the agenda list 

*/
const items = [];

/* 
Placeholder empty string since the code requires at least one object
in the calendar items array. 

*/
const emptyExerciseStr = " ";


/*
The date and exercise both get added to the object for items array.
The function to add the event to Firestore is then called.
*/
function addEventToArray(eventArray,date,exercise) {
  
  eventArray.push({title:date, data:[{name:exercise}]})
  addEventsToFirestore(eventArray);
  // console.log(eventArray);
  return eventArray;
}




/*
Iterate through the array of events and pop of the exercise e.g. {name: "Running"}.
The 

*/
function removeEventFromArray(eventArray,dateString,exerciseName){
  removeEventsFromFirestore(eventArray);
  console.log("\n\nREMOVE EVENT FUNCTION\n")
  for(var i=0; i < eventArray.length; i++){
    if(eventArray[i].title === dateString && eventArray[i].data[0].name === exerciseName){
      eventArray.splice(i,1); 
    }
    
  }
  addEventsToFirestore(eventArray)
  console.log(JSON.stringify(eventArray));
  return eventArray;
}




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



function jsonToArrayDelimiter(eventArray){
  const delimArray = [];
  var eventString = "";

  for(var i=0; i < eventArray.length; i++){

    eventString = eventArray[i].title

    for(var j =0; j < eventArray[i].data.length; j++){
      eventString = eventString + '||' + eventArray[i].data[j].name

      delimArray.push(eventString);
    }
  }
  return delimArray;
}

function printSimpleArray(simpleArray){
  console.log("\n\nprintSimpleArray function\n");
  for(var i = 0; i < simpleArray.length; i++){
    console.log(simpleArray[i]);
  }
}


export default class CalendarScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      isVisible: false,
      dateForm: null,
      exerciseForm: null,
      incorrectDate: false,
      firestoreEvents: []
    };
  }
  

  componentDidMount(){
		firebase
		.auth()
		.onAuthStateChanged(user => {			
			firestore()
				.collection('user')
				.doc(user.uid)
				.get()
				.then(docSnapshot => {
					const workoutData = docSnapshot.get("workoutEvents");
          this.setState({firestoreEvents: workoutData});
          console.log("\n\nREAD EVENTS FROM FIRESTORE HERE")
          console.log(workoutData);

        });
    });
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
    //console.log("MARKED DATESA" + marked)
    return marked;
  }
  
  
  items = addEventToArray(items, todayEST, emptyExerciseStr);
  //items = addEventToArray(items, dateArray, exerciseArray);
  //items = addEventToArray(items, dateStr1, exerciseArray1);

  //items = addEventToArray(items, dateStr2, exerciseArray2);

  //items = removeEventFromArray(items, dateString, exerciseName);
  //readEventsArray = readEventsFromFirestore(readEventsArray);

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
        {text: "OK", onPress : () => console.log("Date and exercise deleted")}
      ]
    )
    //HERE ADD/DISPLAY
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
    const {firestoreEvents} = this.state;
    
		const firestoreExercises = [];
		const dates = [];
    function buildArray (){
			firestoreEvents.forEach(workout =>{
				const parsed = workout.split("||");
				dates.push(parsed[0]);
				parsed.forEach((parsedExercise,index) => {
						if(index == 0) return;
						firestoreExercises.push(parsedExercise);
				});
			});
			return firestoreEvents;
    }
    //buildArray();
  

    function initialAddEventsFromFirestore(dates, firestoreExercises){
      console.log("DATES LENGTH: " + dates.length);
      console.log("EXERCISE LENGTH: " + firestoreExercises.length);
      for(var i = 0; i < dates.length; i++){
        addEventToArray(items, dates[i], firestoreExercises[i]);
      }
    }
    
    //initialAddEventsFromFirestore(dates, firestoreExercises);


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
})