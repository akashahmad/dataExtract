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
            case 'OBJ_NEW_ADMIN_UPDATE':
                return {
                    ...state,
                    objNewAdmin: action.payload
                };
            case 'OBJ_SECOND_ADMIN_UPDATE':
                return {
                    ...state,
                    objSecondAdmin: action.payload
                };
            case 'UNSELECT_DOMAINS_NEW':
                return {
                    ...state,
                    unselectedDomainsNew: action.payload
                };
            case 'UNSELECT_DOMAINS_SECOND':
                return {
                    ...state,
                    unselectedDomainsSecond: action.payload
                };
            case 'SET_DOWNLOAD_URL':
                return {
                    ...state,
                    downLoadUrl: action.payload
                };
            case 'SET_ITEM_POOL':
                return {
                    ...state,
                    itemPools: action.payload
                };
            case 'ROUTE_CHECK':
                return {
                    ...state,
                    routeCheck: action.payload
                };
            case 'SET_FILE_NAME':
                return {
                    ...state,
                    fileName: action.payload
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
    };

    render() {
        let {state, props: {children}} = this;
        return (
            <Context.Provider value={state}>{children}</Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;
