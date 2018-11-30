export function getStartMinutes(appointment) {
  return appointment.startTime;
}

export function getStartHour(appointment) {
  return getHourFromTimeInMinutes(appointment.startTime);
}

export function getEndMinutes(appointment) {
  return appointment.endTime;
}

export function getEndHour(appointment) {
  return getHourFromTimeInMinutes(appointment.endTime);
}

function getHourFromTimeInMinutes(timeInMinutes) {
  return Math.floor(timeInMinutes/60);
}