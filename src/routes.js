import React from 'react'
import {Route, Switch, withRouter} from "react-router-dom";

import Header from './components/header/container'
// Start StartSimulation
import ReasearchData from './container/researchData/container'
// Download
import Popup from './container/submissionPopup/container'

const Routes = () => {
  return (
    <>
    <Header />
    <Switch>
      <Route path={"/download"} component={Popup}/>
      <Route path={"/"} exact={true} component={ReasearchData}/>
    </Switch>
    </>
  );
}
export default withRouter(Routes);
