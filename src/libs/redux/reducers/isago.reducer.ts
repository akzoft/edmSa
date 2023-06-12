import { IISAGOstore, IInfoRes } from "../../others/models"


const initial: IISAGOstore = { loading: false, errors: null, isago: null, isagos: [], tmp: false, ok: "" }
interface IAction { type: string; payload: string | boolean | IInfoRes | IInfoRes[] | any }

const isagoReducer = (state = initial, action: IAction): IISAGOstore => {
    switch (action.type) {
        case "i_loading": return { ...state, loading: true, errors: null }

        case "errors": return { ...state, loading: false, errors: action.payload }


        case "search_isago_reussie": return { ...state, isago: action.payload, tmp: true, errors: null, loading: false }

        case "get_isagos_reussie": return { ...state, isagos: action.payload, errors: null, loading: false }

        case "paiement_isago_reussie": return { ...state, ok: action.payload, tmp: true, errors: null, loading: false }

        case "reset_tmp": return { ...state, tmp: false }
        case "reset_ok": return { ...state, ok: "" }
        case "reset_errors": return { ...state, errors: null }

        default: return state
    }
}

export default isagoReducer