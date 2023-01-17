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

  const updateSpots = function (state, appointments, id) {
    const newDays = [...state.days];

    //find the day
    const index = newDays.findIndex((day) => day.name === state.day);
    const dayObj = newDays[index];

    //count the null appointments
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    const day = { ...dayObj, spots };
    newDays[index] = day;

    //alternate solution
    //const newNewDays = state.days.map((d) => (d.name === state.day ? day : d));
    //maps days array, returns updated day obj with new spots if === otherwise returns the original day obj found in map (dont need newDays above here)

    //return an updated days array
    return newDays;
  };

  //pass to each Appointment component, will use to modify state
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState((prev) => {
        const newStateWithAppointments = {
          ...prev,
          appointments,
        };

        const newStateWithSpots = updateSpots(newStateWithAppointments, id);

        return newStateWithSpots;
      });
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
      setState((prev) => {
        const newStateWithAppointments = {
          ...prev,
          appointments,
        };

        const newStateWithSpots = updateSpots(newStateWithAppointments, id);

        return newStateWithSpots;
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
