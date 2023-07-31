import { IDevisReq, IDevisStore } from "../../others/models"


const initial: IDevisStore = { s_loading: false, errors: null, devi: null, devis: [], tmp: false, ok: "", notif: '' }
interface IAction { type: string; payload: string | boolean | IDevisReq | IDevisReq[] | any }

const devisReducer = (state = initial, action: IAction): IDevisStore => {

    switch (action.type) {
        case "d_loading": return { ...state, s_loading: true, errors: null }

        case "errors": return { ...state, s_loading: false, errors: action.payload }

        case "create_devis_reussie": return { ...state, devis: [...state.devis, action.payload], tmp: true, errors: null, s_loading: false }

        case "getdevi_reussie": return { ...state, devi: action.payload, errors: null, s_loading: false }

        case "get_all_devis_reussie": return { ...state, devis: action.payload, errors: null, s_loading: false }

        case "paiement_devis_reussie": return { ...state, ok: action.payload, tmp: true, errors: null, s_loading: false }

        case 'receive_notif': return { ...state, notif: action.payload, errors: null, s_loading: false }


        case "reset_tmp": return { ...state, tmp: false }
        case "reset_errors": return { ...state, errors: null }

        default: return state
    }
}

export default devisReducer