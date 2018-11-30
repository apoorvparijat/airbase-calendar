import React, { Component } from 'react';
import styled from 'styled-components';
import { getEndHour, getStartHour } from "../../helpers/appointmentHelper";

const AppointmentContainer = styled.div`
  padding: 0.5em;
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
          position  : 'absolute',
          height    : appointment.height ,
          width     : scaledWidth,
          top       : appointment.startTime - 540,
          left      : scaledWidth * (positionToPaint - 1) + 10,
          border: '1px solid #EEE'
        }}
      >
        {startMinute}:{startMin}-{endMinute}:{endMin}
      </AppointmentContainer>
    );
  }
}

export default Appointment;