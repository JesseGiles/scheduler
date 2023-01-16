import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //pass to Form component, form captures name/interviwewer and passes to props.onSave as arguments. Then create new interview object to be passed to props.bookInterview above
  const save = function (name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer,
    };

    props.bookInterview(props.id, interview).then((res) => {
      transition(SHOW); //triggers axios.put, when complete transition to SHOW
    });
  };

  const deleteInterview = function () {
    transition(DELETING, true); //show DELETING mode, then once cancelInterview promise returns below, transition to EMPTY
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  };

  ///////////////

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.dailyInterviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
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
    </article>
  );
}
