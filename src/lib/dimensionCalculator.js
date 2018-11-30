import forEach from 'lodash/forEach';
import range from 'lodash/range';
import { getEndHour, getStartHour } from "../helpers/appointmentHelper";

function getDayObjectToPaint(appointments) {
  const dayObject = groupAppointmentByHour(appointments);
  setWidthForEachNode(dayObject);
  setHeightForEachNode(appointments);
  return dayObject;
}

/**
 * Reduces array of appointments into an object with keys representing hour of the day
 * and values representing array of appointments starting or ending in that hour
 *
 * @param appointments
 * @returns {*}
 */
function groupAppointmentByHour(appointments) {
  const groupedAppointments = appointments.reduce((grouped, appointment) => {
    const startHour = Math.floor(appointment.startTime / 60);
    const endHour = Math.floor(appointment.endTime / 60);
    const hourRange = range(startHour, endHour + 1);
    forEach(hourRange, (hour) => {
      const hourKey = hour + '';
      if (!grouped[hourKey]) {
        grouped[hourKey] = { appointments: [] }
      }
      grouped[hourKey].appointments.push(appointment);
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
    let width;
    const appointmentsArray = dayObject[slotHour].appointments;
    if (dayObject[slotHour].appointmentWidth) {
      width = dayObject[slotHour].appointmentWidth;
    } else {
      width = Math.round(100 / appointmentsArray.length,);
    }
    dayObject[slotHour].appointmentWidth = width;
    forEach(appointmentsArray, (appointment) => {
      const startHour = getStartHour(appointment);
      const endHour = getEndHour(appointment);
      const hourRange = range(startHour, endHour + 1);
      forEach(hourRange, (hour) => {
        const hourKey = hour + '';
        if (!dayObject[hourKey].appointmentWidth || (dayObject[hourKey].appointmentWidth > width)) {
          dayObject[hourKey].appointmentWidth = width;
        }
      });
    })
  });
}

export {
  getDayObjectToPaint,
  groupAppointmentByHour,
  setHeightForEachNode,
  setWidthForEachNode
};