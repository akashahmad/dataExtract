import React from 'react'
import './style.css'
import DatePicker from 'react-date-picker';
import {Link, withRouter} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

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
                                                        if (!date) {
                                                            dispatch({
                                                                type: "SET_START_DATE",
                                                                payload: date
                                                            })
                                                        }
                                                        else if (endDate && endDate < date) {
                                                            dispatch({
                                                                type: "SET_START_DATE",
                                                                payload: endDate
                                                            })
                                                        } else {
                                                            dispatch({
                                                                type: "SET_START_DATE",
                                                                payload: date
                                                            })
                                                        }

                                                    }}
                                                    value={startDate ? startDate : null}
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
                                                        console.log("date", date)
                                                        if (!date) {
                                                            dispatch({
                                                                type: "SET_END_DATE",
                                                                payload: date
                                                            })
                                                        }
                                                        else if (startDate && date < startDate) {
                                                            dispatch({
                                                                type: "SET_END_DATE",
                                                                payload: startDate
                                                            })
                                                        } else {
                                                            dispatch({
                                                                type: "SET_END_DATE",
                                                                payload: date
                                                            })
                                                        }

                                                    }}
                                                    value={endDate ? endDate : null}

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
                                            <select disabled={!dataByTest}>
                                                <option>Select</option>
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