import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";
import classNames from "classnames";
import InterviewerListItem from "./InterviewerListItem";

//receives interviewers array as prop, maps over this to return individual interviewer components
export default function InterviewerList(props) {
  const listInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listInterviewers}</ul>
    </section>
  );
}

//use proptypes library to ensure only interviewers arrays can be passed as props to this component
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
