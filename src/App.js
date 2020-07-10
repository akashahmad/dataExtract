import React, {useEffect} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom'
import Login from './container/login/loginContainer'
import './assets/style/style.css'
import {Provider} from './store';
import Routes from './routes.js'
import cookie from 'react-cookies';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const App = (props) => {
    let {history, location} = props;
    useEffect(() => {
        setTimeout(() => {
            let token = cookie.load("token");
            if (!token) {
                history.push("/login");
            }
        }, 1000);
        // eslint-disable-next-line
    }, [location.pathname]);
    return (
        <Provider>
            <NotificationContainer enterTimeout={500} leaveTimeout={500}/>
            <Switch>
                <Route path={"/login"} exact component={Login}/>
                <Route path={"/"} component={Routes}/>
            </Switch>
        </Provider>
    );
}
export default withRouter(App);
