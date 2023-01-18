import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  //our main state element for this app, will hold the appointments/interviews for each day
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //get appointment/interview data when new day is selected
  const setDay = (day) => setState({ ...state, day });

  //useEffect handles side effects that may occur when doing api calls that could be successful or fail, using promises. Sets state once data is retrieved successfully
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

  //function to update the interview spots available for each day, without mutating state or changing after an appointment edit
  const updateSpots = function (state, appointments) {
    const newDays = [...state.days];

    //find the particular day
    const index = newDays.findIndex((day) => day.name === state.day);
    const dayObj = newDays[index];

    //count the null appointments in a day as these represent the avail spots
    let spots = 0;

    for (const id of dayObj.appointments) {
      const appointment = appointments[id];

      if (!appointment.interview) {
        spots++;
      }
    }

    //spread a previously copied dayObj and add the new spots total, add to copied days array at the original index
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
        const newDays = updateSpots(state, appointments);

        return {
          ...prev,
          days: newDays,
          appointments,
        };
      });
    });
  };

  //if an interview is cancelled, set its value to null, delete from api and update state to reflect the changes
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
        const newDays = updateSpots(state, appointments);

        return {
          ...prev,
          days: newDays,
          appointments,
        };
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
