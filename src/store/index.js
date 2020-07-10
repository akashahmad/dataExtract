import React, {Component} from "react";
const Context = React.createContext();

const reducer = (state, action) => {
        switch (action.type) {
            case 'LOGGED_IN_SET':
                return {
                    ...state,
                    loggedIn: action.payload,
                    loaded: true,
                    user: action.user,
                };
            case 'SET_DOWNLOAD_URL':
                return {
                    ...state,
                    downLoadUrl: action.payload
                };
            case 'SET_START_DATE': {
                console.log("hello", action.payload)
                return {
                    ...state,
                    startDate: action.payload
                };
            }
            case 'SET_END_DATE':
                return {
                    ...state,
                    endDate: action.payload
                };
            case 'SET_TEST_DATA':
                return {
                    ...state,
                    dataByTest: action.payload
                };
            case 'SET_EVENT_UNSELECTED':
                return {
                    ...state,
                    dataByEventUnselected: action.payload
                };
            case 'SET_EVENT_SELECTED':
                return {
                    ...state,
                    dataByEventSelected: action.payload
                };
            case 'SET_GRADE_UNSELECTED':
                return {
                    ...state,
                    dataByGradeSelected: action.payload
                };
            case 'SET_GRADE_SELECTED':
                return {
                    ...state,
                    dataByGradeSelected: action.payload
                };
            default:
                return state;
        }
    }
;

export class Provider extends Component {
    state = {
        dispatch: action => {
            this.setState(state => reducer(state, action))
        },
        loggedIn: false,
        loaded: false,
        user: typeof window !== 'undefined' && JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')) : null,
        downLoadUrl: "",
        startDate: null,
        endDate: null,
        dataByTest: "",
        dataByEventUnselected: [],
        dataByEventSelected: [],
        dataByGradeUnselected: [],
        dataByGradeSelected: [],

    };

    render() {
        let {state, props: {children}} = this;
        return (
            <Context.Provider value={state}>{children}</Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
