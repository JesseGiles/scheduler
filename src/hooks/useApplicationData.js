import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //pass to each Appointment component, will use to modify state
  const bookInterview = function (id, interview) {
    console.log("id: ", id, " interview: ", interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  };

  const cancelInterview = function (id) {
    const interview = null;

    const appointment = {
      ...state.appointments[id],
      interview,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
