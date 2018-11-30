import range from 'lodash/range';
import forEach from 'lodash/forEach';

export function appointmentPainted(hour, position, appointment) {
  console.log(`postion is `, position, appointment);
  return (dispatch) => {
    positionPainted(dispatch, hour, position, appointment);
    dispatch({
               type: 'APPOINTMENT_PAINTED',
               hour,
               position,
               appointment
             });
  }
};

export function positionPainted(dispatch, hour, position, appointment) {
  const startHour = Math.floor(appointment.startTime / 60);
  const endHour   = Math.floor(appointment.endTime / 60);
  const hourRange = range(startHour, endHour + 1);
  console.log(hourRange);
  forEach(hourRange, (hour) => {
    dispatch({
               type: 'POSITION_PAINTED',
               hour: hour + '' ,
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
