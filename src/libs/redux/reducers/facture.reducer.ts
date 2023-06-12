import { IFactureReq, IFactureStore } from "../../others/models"


const initial: IFactureStore = { loading: false, errors: null, facture: null, factures: [], tmp: false, ok: "" }
interface IAction { type: string; payload: string | boolean | IFactureReq | IFactureReq[] | any }

const factureReducer = (state = initial, action: IAction): IFactureStore => {
    switch (action.type) {
        case "f_loading": return { ...state, loading: true, errors: null }

        case "errors": return { ...state, loading: false, errors: action.payload }


        case "search_facture_reussie": return { ...state, facture: action.payload, tmp: true, errors: null, loading: false }

        case "get_factures_reussie": return { ...state, factures: action.payload, errors: null, loading: false }

        case "paiement_facture_reussie": return { ...state, ok: action.payload, tmp: true, errors: null, loading: false }

        case "reset_tmp": return { ...state, tmp: false }
        case "reset_ok": return { ...state, ok: "" }
        case "reset_errors": return { ...state, errors: null }

        default: return state
    }
}

export default factureReducer