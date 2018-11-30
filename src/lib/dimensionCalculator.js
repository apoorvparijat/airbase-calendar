import forEach from 'lodash/forEach';
import range from 'lodash/range';
import { getEndMinutes, getStartMinutes } from "../helpers/appointmentHelper";

function getDayObjectToPaint(appointments) {
  const dayObject = groupAppointmentByHour(appointments);
  setWidthForEachNode(dayObject);
  setHeightForEachNode(appointments);
  return dayObject;
}

/**
 * Reduces array of appointments into an object with keys representing minute of the day
 * and values representing array of appointments starting or ending in that minute
 *
 * @param appointments
 * @returns {*}
 */
function groupAppointmentByHour(appointments) {
  const groupedAppointments = appointments.reduce((grouped, appointment) => {
    const startMinute = getStartMinutes(appointment);
    const endMinute = getEndMinutes(appointment);
    const minuteRange = range(startMinute, endMinute + 1);
    forEach(minuteRange, (minute) => {
      const minuteKey = minute + '';
      if (!grouped[minuteKey]) {
        grouped[minuteKey] = { appointments: [] }
      }
      grouped[minuteKey].appointments.push(appointment);
    });
    return grouped;
  }, {});
  return groupedAppointments;
}

/**
 * Sets height for each appointment node in dayObject.
 * This function has side effects since it modifies the value of dayObject. It doesn't return a value following CQ-Separation.
 * It is intentional since we don't want multiple instances of appointment node object
 *
 * @param appointments
 */
function setHeightForEachNode(appointments) {
  forEach(appointments, (value) => {
    value.height = value.endTime - value.startTime;
  });
}

/**
 * Sets the width attribute for each appointment node in dayObject.
 * This function has side effects since it modifies the value of dayObject. It doesn't return a value following CQ-Separation.
 * It is intentional as we don't want to have multiple instances of appointment node objects.
 *
 * @param dayObject
 */
function setWidthForEachNode(dayObject) {
  const keys = Object.keys(dayObject);
  const sortedKeysBasedOnAppointments = keys.sort((a, b) => {
    return dayObject[b].appointments.length - dayObject[a].appointments.length
  });
  // TODO: Refactor nested for-loops
  forEach(sortedKeysBasedOnAppointments, (slotHour, key) => {
    if (dayObject[slotHour].appointmentWidth) {
      return;
    }
    let width;
    const appointmentsArray = dayObject[slotHour].appointments;
    width = Math.round(100 / appointmentsArray.length,);
    dayObject[slotHour].appointmentWidth = width;
    let minStartHour = parseInt(slotHour);
    let maxEndHour = parseInt(slotHour);
    forEach(appointmentsArray, (appointment) => {
      const startMinute = getStartMinutes(appointment);
      const endMinute = getEndMinutes(appointment);
      if (maxEndHour < endMinute) {
        maxEndHour = endMinute;
      }
      if (minStartHour > startMinute) {
        minStartHour = startMinute;
      }
    });
    const minuteRange = range(minStartHour, maxEndHour);
    forEach(minuteRange, (minute) => {
      const minuteKey = minute + '';
      if (!dayObject[minuteKey].appointmentWidth || (dayObject[minuteKey].appointmentWidth > width)) {
        dayObject[minuteKey].appointmentWidth = width;
      }
    });
  });
}

export {
  getDayObjectToPaint,
  groupAppointmentByHour,
  setHeightForEachNode,
  setWidthForEachNode
};