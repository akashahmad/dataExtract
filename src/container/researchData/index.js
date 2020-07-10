import React, {useState, useEffect} from 'react'
import ResearchData from '../../components/reasearchData/researchData'
import {Link, withRouter} from 'react-router-dom';

const Research = (props) => {
    let {dispatch, history, user, location, endDate, dataByTest, startDate, dataByEventUnselected, dataByEventSelected, dataByGradeUnselected, dataByGradeSelected} = props;

    useEffect(() => {
        if (!user) {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [user, location.pathname]);
    return (
        <>
        <ResearchData dispatch={dispatch} user={user} endDate={endDate}
                      dataByTest={dataByTest} startDate={startDate}
                      dataByEventUnselected={dataByEventUnselected}
                      dataByEventSelected={dataByEventSelected}
                      dataByGradeUnselected={dataByGradeUnselected}
                      dataByGradeSelected={dataByGradeSelected}/>
        </>
    );
}
export default withRouter(Research)

