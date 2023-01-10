import React, { useState } from 'react';

import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
   });

  // let formatSpots = () => {
  //   if (props.spots > 1) {
  //     return `${props.spots} spots remaining`
  //   }

  //   if (props.spots === 1) {
  //     return `${props.spots} spot remaining`
  //   }

  //   if (props.spots === 0) {
  //     return `no spots remaining`
  //   }
  // }

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.name}
    </li>
  );
}