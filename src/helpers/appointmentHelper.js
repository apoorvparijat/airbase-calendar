export function getStartHour(appointment) {
  return getHourFromTimeInMinutes(appointment.startTime);
}

export function getEndHour(appointment) {
  return getHourFromTimeInMinutes(appointment.endTime);
}

function getHourFromTimeInMinutes(timeInMinutes) {
  return Math.floor(timeInMinutes/60);
}