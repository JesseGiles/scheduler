export default function getAppointmentsForDay(state, day) {
  const filteredByDay = state.days.filter(date => date.name === day);
  const todaysAppts = filteredByDay[0];

  if (!todaysAppts) {
    return [];
  } 

  const filteredAppointments = todaysAppts.appointments.map(appt => { 
    return state.appointments[appt]
  })

  return filteredAppointments;
}