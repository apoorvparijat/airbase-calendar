
//
// export function getDayObjectToPaint() {
//   let appointmentNodes = [{ startTime: 9, endTime: 10}];
//   const appointsByHour = groupAppointmentByHour();
//   const sortedAppointsByHour = sortHoursByAppointmentOccurence();
//   setWidthForEachNode(appointmentNodes, sortedAppointsByHour);
//   setHeightForEachNode(appointmentNodes);
//   return appointmentNodes;
// }

function groupAppointmentByHour(appointments) {
  const groupedAppointments = appointments.reduce((grouped, appointment) => {
    const hour = Math.floor(appointment.startTime / 60) + '';
    if (grouped[hour]) {
      grouped[hour].push(appointment);
    } else {
      grouped[hour] = [appointment]
    }
    return grouped;
  }, {})
  return groupedAppointments;
}

function setWidthForEachNode(appointments) {
  // appointments.forEach((appointmentsArray) => {
  //   const width = Math.round(100 / appointmentsArray.length,);
  //   if (!appointmentNodes.width) {
  //     appointmentNodes.width = width;
  //   }
  // });
}

module.exports = {
  groupAppointmentByHour
};