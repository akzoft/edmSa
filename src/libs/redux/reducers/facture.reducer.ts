import { IFactureReq, IFactureStore } from "../../others/models"


const initial: IFactureStore = { facture_loading: false, errors: null, facture: null, factures: [], tmp: false, ok: "", notif: '' }
interface IAction { type: string; payload: string | boolean | IFactureReq | IFactureReq[] | any }

const factureReducer = (state = initial, action: IAction): IFactureStore => {
    switch (action.type) {
        case "facture_loading": return { ...state, facture_loading: true, errors: null }

        case "errors": return { ...state, facture_loading: false, errors: action.payload }


        case "search_facture_reussie": return { ...state, factures: action.payload, tmp: true, errors: null, facture_loading: false }

        case "get_factures_reussie": return { ...state, factures: action.payload, errors: null, facture_loading: false }

        case 'receive_notif': return { ...state, notif: action.payload, errors: null, facture_loading: false }

        case "paiement_facture_reussie": return { ...state, ok: action.payload, tmp: true, errors: null, facture_loading: false }

        case "reset_tmp": return { ...state, tmp: false }
        case "reset_ok": return { ...state, ok: "" }
        case "reset_errors": return { ...state, errors: null }

        default: return state
    }
}

export default factureReducer