import React, { useState } from 'react';

import "components/InterviewerList.scss";
import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  let interviewersClass = classNames("interviewers__list");

  const listInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
      />
    );
  });

  return (
    <ul className={interviewersClass}>
      {listInterviewers}
    </ul>
  );

}