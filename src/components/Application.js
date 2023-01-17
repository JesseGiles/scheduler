import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment/index.js";
import {
  getInterview,
  getAppointmentsForDay,
  getInterviewersForDay,
} from "../helpers/selectors.js";
import useApplicationData from "../hooks/useApplicationData";

/////////

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={getInterview(state, appointment.interview)}
          dailyInterviewers={dailyInterviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments}
        <Appointment //manually created appt to mark cutoff time daily
          key="last"
          time="5pm"
        />
      </section>
    </main>
  );
}
