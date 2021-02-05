import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
         <View>
          <Text> {startDate} </Text>
        </View>

        <CalendarPicker
          onDateChange={this.onDateChange}
          minDate = {new Date(2017, 0, 13)}
          selectedDayColor = 'blue'
          selectedDayTextColor = 'white'
          scrollable = {true}
          todayBackgroundColor = "green"
          allowRangeSelection = {true}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});