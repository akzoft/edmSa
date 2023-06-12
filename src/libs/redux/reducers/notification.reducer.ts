// import { IInfoRes, IInfoStore } from "../../others/models"

import { INotification, INotificationStore } from "../../others/models";


const initial: INotificationStore = { loading: false, errors: null, notification: null, notifications: [], tmp: false }
interface IAction { type: string; payload: string | boolean | INotification | INotification[] | any }

const notifReducer = (state = initial, action: IAction): INotificationStore => {
    switch (action.type) {
        case "n_loading": return { ...state, loading: true, errors: null }

        case "errors": return { ...state, loading: false, errors: action.payload }

        case "get_all_notifs_reussie": return { ...state, notifications: action.payload, errors: null, loading: false }

        case "get_notif_reussie": return { ...state, notification: action.payload.user, tmp: true, errors: null, loading: false }

        case "delete_notif_reussie": return { ...state, notification: action.payload.user, tmp: true, errors: null, loading: false }

        case "reset_errors": return { ...state, errors: null }
        case "reset_tmp": return { ...state, tmp: false }

        default: return state
    }
}

export default notifReducer