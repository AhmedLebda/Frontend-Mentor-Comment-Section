import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import data from "../../data.json"
import { Data, User } from "../types";

const { initialUser: InitialCurrentUser } = data as Data;

interface ActionType {
    type: "user/changeUser",
    payload: { user: User }
}

interface Context {
    currentUser: User;
    dispatch: React.Dispatch<ActionType>;
}

const CurrentUserContext = createContext<Context>({ currentUser: InitialCurrentUser, dispatch: () => null });


const reducer = (state: User, action: ActionType) => {
    switch (action.type) {
        case "user/changeUser":
            return action.payload.user
        default:
            return state
    }
}

export const CurrentUserProvider = ({ children }: PropsWithChildren) => {
    const [currentUser, dispatch] = useReducer(reducer, InitialCurrentUser)
    return (
        <CurrentUserContext.Provider value={{ currentUser, dispatch }}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export const useCurrentUser = () => {
    const currentUserContext = useContext(CurrentUserContext);

    if (!currentUserContext) {
        throw new Error(
            "useCurrentUser has to be used within <CurrentUserContext.Provider>"
        );
    }
    const { currentUser, dispatch } = currentUserContext;

    const changeUser = (user: User): void => {
        console.log(user)
        dispatch({ type: "user/changeUser", payload: { user } })
    }

    return { currentUser, changeUser }
}
