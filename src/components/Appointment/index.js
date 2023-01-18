import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const ERROR_SAVE = "ERROR_SAVE";
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const saveInterview = function (name, interviewer) {
    //create new interview obj with data from form
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      //function triggers axios.put, promise resolved below
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  };

  const deleteInterview = function () {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      //function triggers axios.delete, promise resolved below
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  };

  //////////////////////////

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.dailyInterviewers}
          onCancel={back}
          onSave={saveInterview}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && <Status message={"Saving humanity..."} />}
      {mode === DELETING && <Status message={"Terminating..."} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Choose wisely.."}
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.dailyInterviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={saveInterview}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Something done got borked"} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"I cant let you do that."} onClose={back} />
      )}
    </article>
  );
}
