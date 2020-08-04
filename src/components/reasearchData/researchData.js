import React, {useState} from 'react'
import './style.css'
import DatePicker from 'react-date-picker';
import {Link, withRouter} from 'react-router-dom';
import config from '../../config/config.json'
import {NotificationManager} from 'react-notifications';
import BlurLoader from '../loader';

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
    const [loader, setLoader] = useState(false);

    const submit = (e) => {
        e.preventDefault()
        let gradeIds = dataByGradeSelected.map(sin => {
            return sin.id
        });
        let eventIds = dataByEventSelected.map(sin => {
            return sin.id
        });
        setLoader(true);
        axios.post(config.apiUrl + `/research/count?test=${dataByTest}` + (startDate ? `&fromDate=${startDate}` : "") + (endDate ? `&toDate=${endDate}` : "") + (eventIds && eventIds.length !==0 ? `&event=${eventIds}` : "") + (gradeIds && gradeIds.length !==0 ? `&grade=${gradeIds}` : ""))
            .then(res => {
                history.push("/download");
            }).catch(err => {
            setLoader(false);
            NotificationManager.error('No Record found of given search.', 'Alert', 5000);
        })
    };

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
                            submit(e)
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
                                                    dispatch({
                                                        type: "SET_EVENT_UNSELECTED",
                                                        payload: []
                                                    });
                                                    dispatch({
                                                        type: "SET_EVENT_SELECTED",
                                                        payload: []
                                                    });
                                                    dispatch({
                                                        type: "SET_GRADE_UNSELECTED",
                                                        payload: []
                                                    });
                                                    dispatch({
                                                        type: "SET_GRADE_SELECTED",
                                                        payload: []
                                                    });
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
                                            <select value="" disabled={!dataByTest && dataByEventUnselected}
                                                    onChange={(event) => {
                                                        let item = JSON.parse(event.target.value);
                                                        let duplicateDataByEventSelected = [...dataByEventSelected];
                                                        let duplicateDataByEventUnselected = [...dataByEventUnselected];
                                                        duplicateDataByEventUnselected = duplicateDataByEventUnselected.filter(sin => sin.id !== item.id);
                                                        duplicateDataByEventSelected.push(item);
                                                        let ids = duplicateDataByEventSelected.map(sin => {
                                                            return sin.id
                                                        });
                                                        dispatch({
                                                            type: "SET_GRADE_UNSELECTED",
                                                            payload: []
                                                        })
                                                        dispatch({
                                                            type: "SET_GRADE_SELECTED",
                                                            payload: []
                                                        })
                                                        axios.get(config.apiUrl + `/research/filters?level=grade&ids=${ids}`).then(res => {
                                                            dispatch({
                                                                type: "SET_GRADE_UNSELECTED",
                                                                payload: res.data
                                                            })
                                                        });
                                                        dispatch({
                                                            type: "SET_EVENT_SELECTED",
                                                            payload: [...duplicateDataByEventSelected]
                                                        });
                                                        dispatch({
                                                            type: "SET_EVENT_UNSELECTED",
                                                            payload: [...duplicateDataByEventUnselected]
                                                        })
                                                    }}>
                                                <option>Select</option>
                                                {dataByEventUnselected && dataByEventUnselected.map((sin, ind) =>
                                                    <option key={ind}
                                                            value={JSON.stringify(sin)}>{sin.name}</option>)}
                                            </select>
                                            <div className="tags-container">
                                                <div className="tags">
                                                    {dataByEventSelected && dataByEventSelected.map((sin, ind) =>
                                                        <div
                                                            key={ind}>
                                                            <p>{sin.name}</p>
                                                            <div className="image-close"><img
                                                                src={require('../../assets/images/close.png')}
                                                                alt=""
                                                                onClick={() => {
                                                                    let duplicateDataByEventSelected = [...dataByEventSelected];
                                                                    let duplicateDataByEventUnselected = [...dataByEventUnselected];
                                                                    duplicateDataByEventSelected = duplicateDataByEventSelected.filter(single => single.id !== sin.id);
                                                                    duplicateDataByEventUnselected.push(sin);
                                                                    dispatch({
                                                                        type: "SET_EVENT_SELECTED",
                                                                        payload: [...duplicateDataByEventSelected]
                                                                    })
                                                                    dispatch({
                                                                        type: "SET_EVENT_UNSELECTED",
                                                                        payload: [...duplicateDataByEventUnselected]
                                                                    })
                                                                }}
                                                            /></div>
                                                        </div>)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* data by garden */}
                                    <div className="inside-div-of-others-input padding-right-side-div">
                                        <div>
                                            <h2>Data By Grades</h2>
                                        </div>
                                        <div onClick={() => {
                                            if (dataByGradeUnselected.length === 0 && dataByEventSelected.length===0)
                                                NotificationManager.error('Please select data by event.', 'Alert', 5000);
                                        }}>
                                            <select value="" disabled={dataByGradeUnselected.length === 0 && dataByEventSelected.length===0}
                                                    onChange={(event) => {
                                                        let item = JSON.parse(event.target.value);
                                                        let duplicateDataByGradeSelected = [...dataByGradeSelected];
                                                        let duplicateDataByGradeUnselected = [...dataByGradeUnselected];
                                                        duplicateDataByGradeUnselected = duplicateDataByGradeUnselected.filter(sin => sin.id !== item.id);
                                                        duplicateDataByGradeSelected.push(item);
                                                        dispatch({
                                                            type: "SET_GRADE_SELECTED",
                                                            payload: [...duplicateDataByGradeSelected]
                                                        });
                                                        dispatch({
                                                            type: "SET_GRADE_UNSELECTED",
                                                            payload: [...duplicateDataByGradeUnselected]
                                                        })
                                                    }}>
                                                <option>Select</option>
                                                {dataByGradeUnselected && dataByGradeUnselected.map((sin, ind) =>
                                                    <option key={ind}
                                                            value={JSON.stringify(sin)}>{sin.name}</option>)}
                                            </select>
                                            <div className="tags-container">
                                                <div className="tags">
                                                    {dataByGradeSelected && dataByGradeSelected.map((sin, ind) =>
                                                        <div
                                                            key={ind}>
                                                            <p>{sin.name}</p>
                                                            <div className="image-close"><img
                                                                src={require('../../assets/images/close.png')}
                                                                alt=""
                                                                onClick={() => {
                                                                    let duplicateDataByGradeSelected = [...dataByGradeSelected];
                                                                    let dublicateDataByGradeUnselected = [...dataByGradeUnselected];
                                                                    duplicateDataByGradeSelected = duplicateDataByGradeSelected.filter(single => single.id !== sin.id);
                                                                    dublicateDataByGradeUnselected.push(sin);
                                                                    dispatch({
                                                                        type: "SET_GRADE_SELECTED",
                                                                        payload: [...duplicateDataByGradeSelected]
                                                                    })
                                                                    dispatch({
                                                                        type: "SET_GRADE_UNSELECTED",
                                                                        payload: [...dublicateDataByGradeUnselected]
                                                                    })
                                                                }}
                                                            /></div>
                                                        </div>)}
                                                </div>
                                            </div>
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
        {(loader) && <BlurLoader />}

        </>
    );
}

export default withRouter(ExtractData)