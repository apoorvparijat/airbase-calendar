import React, { Component } from 'react';
import range from 'lodash/range';
import difference from 'lodash/difference';
import Appointment from "./Appointment";
import { getStartMinutes } from "../../helpers/appointmentHelper";

class MinuteRow extends Component {
  constructor(props) {
    super(props);
    this.appointments = this.props.minuteObject.appointments || [];
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
    const { appointmentWidth } = this.props.minuteObject;

    // Don't paint if the appointment doesn't start in this minute
    if (!this.isAppointmentStartingThisHour(appointment, this.props.minuteKey)) {
      return;
    }

    // Figure out which position/index to paint this appointment node at
    const positionsPainted = this.props.minuteObject.positionsPainted || [];
    const positionToPaint  = this.getPositionOpenToPaint(this.appointments.length, positionsPainted);

    // Call appointmentPainted handler
    this.props.appointmentPaintedHandler(this.props.minuteKey, positionToPaint, appointment);

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
   * Returns whether an appointment belongs in the given minuteKey
   * @param appointment
   * @param minuteKey
   * @returns {boolean}
   */
  isAppointmentStartingThisHour(appointment, minuteKey) {
    return (getStartMinutes(appointment) + '') === minuteKey
  }
}


export default MinuteRow;