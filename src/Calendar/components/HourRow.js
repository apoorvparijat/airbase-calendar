import React, { Component } from 'react';
import range from 'lodash/range';
import difference from 'lodash/difference';
import Appointment from "./Appointment";

class HourRow extends Component {
  constructor(props) {
    super(props);
    this.appointments = this.props.hourObject.appointments || [];
  }

  /**
   * Returns a open position index where we cna paint this appointment node
   *
   * @param totalAppointments
   * @param positionsPainted
   * @returns {*}
   */
  getPositionOpenToPaint(totalAppointments, positionsPainted) {
    const allPositions  = range(1, totalAppointments + 1);
    const positionsOpen = difference(allPositions, positionsPainted);
    if (positionsOpen.length === 0) {
      return 1;
    }
    return positionsOpen[0];
  }

  /**
   * Renders an appointment.
   *
   * @param appointment
   * @returns {*}
   */
  renderAppointment(appointment) {
    const { appointmentWidth } = this.props.hourObject;

    // Don't paint if the appointment doesn't start in this hour
    if (!this.isAppointmentStartingThisHour(appointment, this.props.hourKey)) {
      return;
    }

    // Figure out which position/index to paint this appointment node at
    const positionsPainted = this.props.hourObject.positionsPainted || [];
    const positionToPaint  = this.getPositionOpenToPaint(this.appointments.length, positionsPainted);

    // Call appointmentPainted handler
    this.props.appointmentPaintedHandler(this.props.hourKey, positionToPaint, appointment);

    // Calculate height, weight and coordinates for this node to paint at.
    return (
      <Appointment
        appointment={appointment}
        positionToPaint={positionToPaint}
        width={appointmentWidth}
      />
    );
  }

  render() {
    const appointmentNodes = this.appointments.map(
      (appointment) => this.renderAppointment(appointment));
    return (
      appointmentNodes
    );
  }

  /**
   * Returns whether an appointment belongs in the given hourKey
   * @param appointment
   * @param hourKey
   * @returns {boolean}
   */
  isAppointmentStartingThisHour(appointment, hourKey) {
    return (Math.floor(appointment.startTime / 60) + '') === hourKey
  }
}


export default HourRow;