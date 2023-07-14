import { IActualite, IActualiteStore } from "../../others/models"




const initial: IActualiteStore = { actu_loading: false, errors: null, actualite: null, actualites: [], tmp: false }
interface IAction { type: string; payload: string | boolean | IActualite | IActualite[] | any }

const actualiteReducer = (state = initial, action: IAction): IActualiteStore => {
    switch (action.type) {
        case "actu_loading": return { ...state, actu_loading: true, errors: null }

        case "errors": return { ...state, actu_loading: false, errors: action.payload }

        case "get_all_actu_reussie": return { ...state, actualites: action.payload, tmp: true, errors: null, actu_loading: false }

        case "get_actu_reussie": return { ...state, actualite: action.payload.user, tmp: true, errors: null, actu_loading: false }

        case "reset_errors": return { ...state, errors: null }
        case "reset_tmp": return { ...state, tmp: false }

        default: return state
    }
}

export default actualiteReducer