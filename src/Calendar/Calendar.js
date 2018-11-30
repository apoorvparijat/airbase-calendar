import React, { Component } from 'react';
import styled from 'styled-components';
import { getDayObjectToPaint } from "../lib/dimensionCalculator";
import HourRow from "./components/HourRow";

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

  appointmentPaintedHandler(hourKey, positionPainted, appointment) {
    this.props.appointmentPainted(hourKey, positionPainted, appointment);
  }

  renderHours(dayObject) {
    const renderedHourRows = [];
    for (let i = 9; i <= 21; i++) {
      const hourKey = i + '';
      if (dayObject[hourKey]) {
        renderedHourRows.push(<HourRow key={i}
                                       hourKey={hourKey}
                                       hourObject={dayObject[hourKey]}
                                       appointmentPaintedHandler={this.appointmentPaintedHandler.bind(this)}
                                       />)
      }
    }
    return renderedHourRows;
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