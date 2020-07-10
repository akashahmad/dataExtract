import React from "react";
import Component from "./submissionPopup";
import {Consumer} from '../../store';
const Container = () => {
  return (
    <Consumer>
      {
        ({dispatch, downLoadUrl, routeCheck, user}) => (
          <Component dispatch={dispatch} downLoadUrl={downLoadUrl} routeCheck={routeCheck} user={user}/>
        )
      }
    </Consumer>
  )
};

export default Container;
