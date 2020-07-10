import React from "react";
import Component from "./header.js";
import {Consumer} from '../../store/index';

const Container = (props) => {
    let {hideLoginHeader} = props;
    return (
        <Consumer>
            {
                ({dispatch, user}) => (
                    <Component dispatch={dispatch} user={user} hideLoginHeader={hideLoginHeader}/>
                )
            }
        </Consumer>
    )
};

export default Container;
