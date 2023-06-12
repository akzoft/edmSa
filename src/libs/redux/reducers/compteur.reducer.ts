import { ICompteur, ICompteurStore } from "../../others/models"


const initial: ICompteurStore = { c_loading: false, errors: null, compteur: null, isago_cpt: [], classics_cpt: [], compteurs: [], temp: false, tmp: false, tmp_del: false }
interface IAction { type: string; payload: string | boolean | ICompteur | ICompteur[] | any }

const compteurReducer = (state = initial, action: IAction): ICompteurStore => {

    switch (action.type) {
        case "d_loading": return { ...state, c_loading: true, errors: null }

        case "errors": return { ...state, c_loading: false, errors: action.payload }

        case "create_compteur_reussie": return { ...state, compteurs: [...state.compteurs, action.payload], tmp: true, errors: null, c_loading: false }


        case "update_compteur_reussie": const maj = state.compteurs.map(cpt => {
            if (cpt.id === action.payload.id) return { ...cpt, ...action.payload }
            return cpt
        })
            return { ...state, c_loading: false, errors: null, temp: true, compteurs: maj }


        case "delete_compteur_reussie": const del = state.compteurs.filter(cpt => cpt.id !== action.payload.id)
            return { ...state, c_loading: false, errors: null, compteurs: del, tmp_del: true }


        case "get_all_compteur_reussie": return { ...state, compteurs: action.payload, errors: null, c_loading: false }
        case "get_all_compteur_classic_reussie": return { ...state, classics_cpt: action.payload, errors: null, c_loading: false }
        case "get_all_compteur_isago_reussie": return { ...state, isago_cpt: action.payload, errors: null, c_loading: false }

        case "reset_tmp": return { ...state, tmp: false }
        case "reset_temp": return { ...state, temp: false }
        case "reset_tmp_del": return { ...state, tmp_del: false }
        case "reset_errors": return { ...state, errors: null }

        default: return state
    }
}

export default compteurReducer