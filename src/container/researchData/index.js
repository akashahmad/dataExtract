import React, {useState} from 'react'
import Header from '../../components/header/header'
import ResearchData from '../../components/reasearchData/researchData'
import SubmissionPopup from '../../components/submissionPopup/submissionPopup'

export default () => {

    const [submissionPopup, setSubmissionPopup] = useState(false);

    return (
        <>
        <SubmissionPopup setSubmissionPopup={setSubmissionPopup} submissionPopup={submissionPopup}/>
        <Header />
        <ResearchData setSubmissionPopup={setSubmissionPopup}/>
        </>
    );
}