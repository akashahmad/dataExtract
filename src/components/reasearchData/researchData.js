import React from 'react'
import './style.css'
import DatePicker from 'react-date-picker';
import {Link, withRouter} from 'react-router-dom';
import config from '../../config/config.json'
import {NotificationManager} from 'react-notifications';
import axios from 'axios';

const ExtractData = (props) => {
    let {
        dispatch, history, location, endDate, user,
        dataByTest, startDate,
        dataByEventUnselected,
        dataByEventSelected,
        dataByGradeUnselected,
        dataByGradeSelected
    } = props;

    return (
        <>
        <div className="container-fluid">
            <div className="container main-div-of-reasearchData">
                <div>
                    <div className="indside-main-div-of-researchData">
                        {/* heading starts from here */}
                        <div className="heading">
                            <h2>Rearserch Data</h2>
                        </div>
                        {/* form starts from here */}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            history.push("/download");
                        }}>
                            <div className="form-container">
                                <div className="inside-form-div">
                                    {/* start Date and End date */}
                                    <div className="starts-date-endDate">
                                        {/* start date */}
                                        <div>
                                            <div className="label-div">
                                                <h2>Start Date</h2>
                                            </div>
                                            <div>
                                                <DatePicker
                                                    onChange={(date) => {
                                                        let standardEndDate = endDate ? new Date(endDate) : null;
                                                        if (!date) {
                                                            dispatch({
                                                                type: "SET_START_DATE",
                                                                payload: date
                                                            })
                                                        }
                                                        else if (standardEndDate && standardEndDate < date) {
                                                            NotificationManager.error('Please ensure that the Start Date is less than or equal to the End Date.', 'Alert', 5000);
                                                            let requiredDateStructure = new Date(endDate).toJSON();
                                                            dispatch({
                                                                type: "SET_START_DATE",
                                                                payload: requiredDateStructure
                                                            })
                                                        } else {
                                                            let requiredDateStructure = new Date(date).toJSON();
                                                            dispatch({
                                                                type: "SET_START_DATE",
                                                                payload: requiredDateStructure
                                                            })
                                                        }

                                                    }}
                                                    value={startDate ? new Date(startDate) : null}
                                                />
                                            </div>
                                        </div>
                                        {/* End date */}
                                        <div className="end-date-div">
                                            <div className="label-div">
                                                <h2>End Date</h2>
                                            </div>
                                            <div>
                                                <DatePicker
                                                    onChange={(date) => {
                                                        let standardStartDate = startDate ? new Date(startDate) : null;
                                                        if (!date) {
                                                            dispatch({
                                                                type: "SET_END_DATE",
                                                                payload: date
                                                            })
                                                        }
                                                        else if (standardStartDate && date < standardStartDate) {
                                                            NotificationManager.error('Please ensure that the End Date is greater than or equal to the Start Date.', 'Alert', 5000);
                                                            let requiredDateStructure = new Date(startDate).toJSON();
                                                            dispatch({
                                                                type: "SET_END_DATE",
                                                                payload: requiredDateStructure
                                                            })
                                                        } else {
                                                            let requiredDateStructure = new Date(date).toJSON();
                                                            dispatch({
                                                                type: "SET_END_DATE",
                                                                payload: requiredDateStructure
                                                            })
                                                        }

                                                    }}
                                                    value={endDate ? new Date(endDate) : null}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* data by set */}
                                    <div className="data-by-set">
                                        <div>
                                            <h2>Data By Test <span className="staric-star">*</span></h2>
                                        </div>
                                        <div>
                                            <select onChange={(event) => {
                                                dispatch({
                                                    type: "SET_TEST_DATA",
                                                    payload: event.target.value
                                                })
                                                if (event.target.value) {
                                                    axios.get(config.apiUrl + `/research/filters?level=event&test=${event.target.value}` + (startDate ? `&fromDate=${startDate}` : "") + (endDate ? `&toDate=${endDate}` : "")).then(res => {
                                                        dispatch({
                                                            type: "SET_EVENT_UNSELECTED",
                                                            payload: res.data
                                                        })
                                                    })
                                                }
                                            }} value={dataByTest ? dataByTest : ""}
                                                    required
                                            >
                                                <option value="">Select</option>
                                                <option value="M">Math</option>
                                                <option value="R">Reading</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* data by event and data by garden */}
                                <div className="main-div-of-another-inputs-and-labels">
                                    <div className="inside-div-of-others-input">
                                        <div>
                                            <h2>Data By Events</h2>
                                        </div>
                                        <div onClick={() => {
                                            if (!dataByTest)
                                                NotificationManager.error('Please select data by test.', 'Alert', 5000);
                                        }}>
                                            <select disabled={!dataByTest && dataByEventUnselected}>
                                                <option>Select</option>
                                                {dataByEventUnselected && dataByEventUnselected.map((sin, ind) =>
                                                    <option key={ind}
                                                            value={JSON.stringify(sin)}>{sin.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    {/* data by garden */}
                                    <div className="inside-div-of-others-input padding-right-side-div">
                                        <div>
                                            <h2>Data By Grades</h2>
                                        </div>
                                        <div>
                                            <select>
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* data by district and date by building */}
                                <div className="main-div-of-another-inputs-and-labels">
                                    <div className="inside-div-of-others-input">
                                        <div>
                                            <h2>Data By District</h2>
                                        </div>
                                        <div>
                                            <select>
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* data by building */}
                                    <div className="inside-div-of-others-input padding-right-side-div">
                                        <div>
                                            <h2>Data by Building</h2>
                                        </div>
                                        <div>
                                            <select>
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* data by className */}
                                <div className="main-div-of-another-inputs-and-labels">
                                    <div className="inside-div-of-others-input">
                                        <div>
                                            <h2>Data By Classname</h2>
                                        </div>
                                        <div>
                                            <select>
                                                <option>Select</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* buttons */}
                                <div className="buttons-main-div">
                                    <div className="inside-div-of-buttons">
                                        {/*<span className="Cancel cursor-pointer">Cancel</span>*/}
                                        <button type="submit" className="Submit cursor-pointer">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default withRouter(ExtractData)