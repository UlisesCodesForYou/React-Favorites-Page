import {useState, useEffect} from "react";


let globalState = {} // These global variables will SHARE LOGIC AND DATA!
let listeners = [];
let actions = {};

export const useStore = () => {
    const setState = useState(globalState)[1];

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload) //This function will return a new state that gets
        globalState = {...globalState, ...newState} //This mergers the new state and the old state

        for (const listener of listeners) {
            listener(globalState)
        }
    }

    useEffect(() => {
        listeners.push(setState)

        return () => {
            listeners = listeners.filter(li => li !== setState)
        }

    }, [setState])

    return [globalState, dispatch]
};

export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = {...globalState, ...initialState}
    }
    actions = {...actions, ...userActions}

}