import React from "react";
import Component from "./index";
import {Consumer} from '../../store';

const Container = () => {
    return (
        <Consumer>
            {
                ({
                     dispatch, user, endDate,
                     dataByTest, startDate,
                     dataByEventUnselected,
                     dataByEventSelected,
                     dataByGradeUnselected,
                     dataByGradeSelected
                 }) => (
                    <Component dispatch={dispatch} user={user}
                               endDate={endDate}
                               dataByTest={dataByTest} startDate={startDate}
                               dataByEventUnselected={dataByEventUnselected}
                               dataByEventSelected={dataByEventSelected}
                               dataByGradeUnselected={dataByGradeUnselected}
                               dataByGradeSelected={dataByGradeSelected}
                    />
                )
            }
        </Consumer>
    )
};

export default Container;
