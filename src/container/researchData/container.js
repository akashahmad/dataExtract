import React from "react";
import Component from "./index";
import {Consumer} from '../../store';

const Container = () => {
    return (
        <Consumer>
            {
                ({dispatch, user}) => (
                    <Component dispatch={dispatch} user={user}
                    />
                )
            }
        </Consumer>
    )
};

export default Container;
