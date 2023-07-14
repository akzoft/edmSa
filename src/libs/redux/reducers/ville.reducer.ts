import { IActualite, IVillestore, IVille } from "../../others/models"




const initial = { ville_loading: false, errors: null, villes: [] }
interface IAction { type: string; payload: string | IVille | IVille[] | any }

const villeReducer = (state = initial, action: IAction): IVillestore => {
    switch (action.type) {
        case "ville_loading": return { ...state, ville_loading: true, errors: null }

        case "errors": return { ...state, ville_loading: false, errors: action.payload }

        case "get_all_ville_reussie": return { ...state, villes: action.payload, errors: null, ville_loading: false }


        case "reset_errors": return { ...state, errors: null }

        default: return state
    }
}

export default villeReducer