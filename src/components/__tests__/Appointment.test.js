import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  xit("does something it is supposed to do", () => {
    // ...
  });

  xit("does something else it is supposed to do", () => {
    // ...
  });
});

// key={appointment.id}
//           id={appointment.id}
//           time={appointment.time}
//           interview={getInterview(state, appointment.interview)}
//           dailyInterviewers={dailyInterviewers}
//           bookInterview={bookInterview}
//           cancelInterview={cancelInterview}
