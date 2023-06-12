import { IActualite, IActualiteStore } from "../../others/models"




const initial: IActualiteStore = { loading: false, errors: null, actualite: null, actualites: [], tmp: false }
interface IAction { type: string; payload: string | boolean | IActualite | IActualite[] | any }

const actualiteReducer = (state = initial, action: IAction): IActualiteStore => {
    switch (action.type) {
        case "a_loading": return { ...state, loading: true, errors: null }

        case "errors": return { ...state, loading: false, errors: action.payload }

        case "get_all_actu_reussie": return { ...state, actualites: action.payload, tmp: true, errors: null, loading: false }

        case "get_actu_reussie": return { ...state, actualite: action.payload.user, tmp: true, errors: null, loading: false }

        case "reset_errors": return { ...state, errors: null }
        case "reset_tmp": return { ...state, tmp: false }

        default: return state
    }
}

export default actualiteReducer