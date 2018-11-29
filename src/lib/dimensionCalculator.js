import forEach from 'lodash/forEach';
import forOwn from 'lodash/forOwn';


export function getDayObjectToPaint() {
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
    const startHour = Math.floor(appointment.startTime / 60) + '';
    const endHour = Math.floor(appointment.endTime / 60) + '';
    if (grouped[startHour]) {
      grouped[startHour].push(appointment);
    } else {
      grouped[startHour] = [appointment]
    }
    if (grouped[endHour]) {
      grouped[endHour].push(appointment);
    } else {
      grouped[endHour] = [appointment]
    }
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
  forOwn(dayObject, (appointmentsArray, key) => {
    const width = Math.round(100 / appointmentsArray.length,);
    forEach(appointmentsArray, (appointmentNode) => {
      // Set width if width is not already set or the current width of element is bigger than the new width
      if (typeof(appointmentNode.width) === 'undefined' || appointmentNode.width > width) {
        appointmentNode.width = width;
      }
    })
  });
}

module.exports = {
  groupAppointmentByHour,
  setHeightForEachNode,
  setWidthForEachNode
};