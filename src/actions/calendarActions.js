import range from 'lodash/range';
import forEach from 'lodash/forEach';
import { getEndMinutes, getStartMinutes } from "../helpers/appointmentHelper";

export function appointmentPainted(minute, position, appointment) {
  console.log(`postion is `, position, appointment);
  return (dispatch) => {
    positionPainted(dispatch, minute, position, appointment);
    dispatch({
               type: 'APPOINTMENT_PAINTED',
               minute,
               position,
               appointment
             });
  }
};

export function positionPainted(dispatch, minute, position, appointment) {
  const startMinute = getStartMinutes(appointment);
  const endMinute   = getEndMinutes(appointment);
  const minuteRange = range(startMinute, endMinute + 1);
  console.log(minuteRange);
  forEach(minuteRange, (minute) => {
    dispatch({
               type: 'POSITION_PAINTED',
               minute: minute + '' ,
               position
             })
  })
}

export function updateDayObject(dayObject) {
  return (dispatch) => {
    dispatch({
               type: 'UPDATE_DAY_OBJECT',
               dayObject
             });
  }
}
