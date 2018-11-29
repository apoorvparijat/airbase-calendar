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
    if (!grouped[startHour]) {
      grouped[startHour] = { appointments: [] }
    }
    if (!grouped[endHour]) {
      grouped[endHour] = { appointments: []}
    }
    grouped[startHour].appointments.push(appointment);
    grouped[endHour].appointments.push(appointment);
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
    return dayObject[a].length - dayObject[b].length
  });
  forEach(sortedKeysBasedOnAppointments, (slotHour, key) => {
    const appointmentsArray = dayObject[slotHour].appointments;
    const width = Math.round(100 / appointmentsArray.length,);
    dayObject[slotHour].appointmentWidth = width;
  });
}

module.exports = {
  groupAppointmentByHour,
  setHeightForEachNode,
  setWidthForEachNode
};