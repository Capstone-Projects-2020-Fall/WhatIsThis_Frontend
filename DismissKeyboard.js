import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

export default DismissKeyboard;