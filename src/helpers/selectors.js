const getAppointmentsForDay = function(state, day) {
  const filteredByDay = state.days.filter(date => date.name === day);
  const todaysAppts = filteredByDay[0];

  if (!todaysAppts) {
    return [];
  }

  const filteredAppointments = todaysAppts.appointments.map(appt => {
    return state.appointments[appt]
  })

  return filteredAppointments;
};

const getInterviewersForDay = function(state, day) {
  const filteredByDay = state.days.filter(date => date.name === day);
  const todaysAppts = filteredByDay[0];

  if (!todaysAppts) {
    return [];
  }

  const filteredInterviewers = todaysAppts.interviewers.map(interviewer => {
    return state.interviewers[interviewer]
  })

  return filteredInterviewers;
};

const getInterview = function(state, interview) {

  if (!interview) {
    return null
  }

  const interviewer = state.interviewers[interview.interviewer]

  const interviewObj = {
    student: interview.student,
    interviewer: {...interviewer}
  }

  return interviewObj
   
};

export {getAppointmentsForDay, getInterviewersForDay, getInterview};
