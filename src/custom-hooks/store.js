import {useEffect, useState} from "react";


let globalState = {} // These global variables will SHARE DATA!
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => { // THIS USESTORE WILL SHARE THE DATA WHAT WILL BE PASSED UP TO THE GLOBAL VARIABLES!
    const setState = useState(globalState)[1];

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload) //This function will return a new state that gets
        globalState = {...globalState, ...newState} //This mergers the new state and the old state

        for (const listener of listeners) {
            listener(globalState)
        }
    }

    useEffect(() => {
        if (shouldListen) {
            listeners.push(setState)

        }


        return () => {
            if (shouldListen) {
                listeners = listeners.filter(li => li !== setState)
            }

        }

    }, [setState, shouldListen])

    return [globalState, dispatch]
};

export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = {...globalState, ...initialState}
    }
    actions = {...actions, ...userActions}

}