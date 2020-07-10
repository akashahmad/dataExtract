import React, {useState, useEffect} from 'react'
import ResearchData from '../../components/reasearchData/researchData'
import {Link, withRouter} from 'react-router-dom';

const Research = (props) => {
    let {dispatch, history, user, location} = props;

    useEffect(() => {
        if (!user) {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [user, location.pathname]);
    return (
        <>
        <ResearchData dispatch={dispatch}/>
        </>
    );
}
export default withRouter(Research)

