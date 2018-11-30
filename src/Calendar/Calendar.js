import React, { Component } from 'react';
import styled from 'styled-components';
import { getDayObjectToPaint } from "../lib/dimensionCalculator";
import MinuteRow from "./components/MinuteRow";

import * as calendarActions from '../actions/calendarActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const CalendarContainer = styled.div`
  position: relative;
  height: 720px; 
  width: 620px;
  padding: 0 10px;
  border: 1px solid #EEE;
  border-radius: 3px;
`;

class Calendar extends Component {

  appointmentPaintedHandler(minuteKey, positionPainted, appointment) {
    this.props.appointmentPainted(minuteKey, positionPainted, appointment);
  }

  renderHours(dayObject) {
    const renderedMinuteRows = [];
    for (let i = 540; i <= 1260; i++) {
      const minuteKey = i + '';
      if (dayObject[minuteKey]) {
        renderedMinuteRows.push(<MinuteRow key={i}
                                         minuteKey={minuteKey}
                                         minuteObject={dayObject[minuteKey]}
                                         appointmentPaintedHandler={this.appointmentPaintedHandler.bind(this)}
                                       />)
      }
    }
    return renderedMinuteRows;
  }

  render() {
    const dayObject = getDayObjectToPaint(this.props.appointments);
    this.props.updateDayObject(dayObject);
    return (
      <CalendarContainer>
        {this.renderHours(dayObject)}
      </CalendarContainer>
    );
  }
}

const actions = {
  ...calendarActions
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
};

export default connect(null, mapDispatchToProps)(Calendar);