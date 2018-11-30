import React, { Component } from 'react';
import styled from 'styled-components';
import { getEndHour, getStartHour } from "../../helpers/appointmentHelper";

const AppointmentContainer = styled.div`
  position  : 'absolute';
  padding: 0.5em;
  border: '1px solid #EEE';
`;

class Appointment extends Component {
  render() {
    const {
            appointment,
            positionToPaint,
            width
          }           = this.props;
    const scaledWidth = (width / 100) * 600;
    const startMinute = getStartHour(appointment);
    const startMin = appointment.startTime - 60 * startMinute;
    const endMinute = getEndHour(appointment);
    const endMin = appointment.endTime - 60 * endMinute;
    return (
      <AppointmentContainer
        style={{
          height    : appointment.height ,
          width     : scaledWidth,
          top       : appointment.startTime - 540,
          left      : scaledWidth * (positionToPaint - 1) + 10,
        }}
      >
        {startMinute}:{startMin}-{endMinute}:{endMin}
      </AppointmentContainer>
    );
  }
}

export default Appointment;