import React from 'react'
import './style.css'
import DatePicker from 'react-date-picker';

export default (props) => {

    let { setSubmissionPopup } = props;
    let date = new Date();

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
                            <form>
                                <div className="form-container">
                                    <div className="inside-form-div">
                                        {/* start Date and End date */}
                                        <div className="starts-date-endDate">
                                            {/* start date */}
                                            <div>
                                                <div className="label-div">
                                                    <label>Start Date</label>
                                                </div>
                                                <div>
                                                    <DatePicker
                                                        value={date}
                                                    />
                                                </div>
                                            </div>
                                            {/* End date */}
                                            <div className="end-date-div">
                                                <div className="label-div">
                                                    <label>End Date</label>
                                                </div>
                                                <div>
                                                    <DatePicker
                                                        value={date}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* data by set */}
                                        <div className="data-by-set">
                                            <div>
                                                <label>Data By Set</label>
                                            </div>
                                            <div>
                                                <select>
                                                    <option>Math</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* data by event and data by garden */}
                                    <div className="main-div-of-another-inputs-and-labels">
                                        <div className="inside-div-of-others-input">
                                            <div>
                                                <label>Data By Events</label>
                                            </div>
                                            <div>
                                                <select>
                                                    <option>Math</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* data by garden */}
                                        <div className="inside-div-of-others-input padding-right-side-div">
                                            <div>
                                                <label>Data By Grades</label>
                                            </div>
                                            <div>
                                                <select>
                                                    <option>Math</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* data by district and date by building */}
                                    <div className="main-div-of-another-inputs-and-labels">
                                        <div className="inside-div-of-others-input">
                                            <div>
                                                <label>Data By District</label>
                                            </div>
                                            <div>
                                                <select>
                                                    <option>Math</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* data by building */}
                                        <div className="inside-div-of-others-input padding-right-side-div">
                                            <div>
                                                <label>Data by Building</label>
                                            </div>
                                            <div>
                                                <select>
                                                    <option>Math</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* data by className */}
                                    <div className="main-div-of-another-inputs-and-labels">
                                        <div className="inside-div-of-others-input">
                                            <div>
                                                <label>Data By Classname</label>
                                            </div>
                                            <div>
                                                <select>
                                                    <option>Math</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* buttons */}
                                    <div className="buttons-main-div">
                                        <div className="inside-div-of-buttons">
                                            <span className="Cancel cursor-pointer">Cancel</span>
                                            <span className="Submit cursor-pointer" onClick={() => setSubmissionPopup(true)}>Submit</span>
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