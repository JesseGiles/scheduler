import React, { useState } from 'react';

import classNames from "classnames";
import InterviewerList from "../InterviewerList";
import Button from "../Button";
import { getOwnPropertySymbols } from 'core-js/core/object';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  console.log('student: ', student)

  const reset = () => {
    console.log("reset");
    setStudent("")
    setInterviewer(null)
  };

  const cancel = () => {
    reset();
    props.onCancel()
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
        interviewers = {props.interviewers}
        value = {interviewer}
        onChange = {setInterviewer}

        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );

}






    // <>
    // <input 
    // value={name} 
    // onChange={(event) => setName(event.target.value)}
    // placeholder="Type your name"></input>
    // <Button reset={reset}>Reset</Button>
    // {name ? <h1>Hello {name}</h1> : <h1></h1>}
    // </>
  