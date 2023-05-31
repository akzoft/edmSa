import { ILoginRes, IRegisterRes, IStore } from "../../others/models"


const initial: IStore = { loading: false, errors: null, user: null, auth: null, temp: false, code: { id: "", pin: 0 }, username: null }
interface IAction { type: string; payload: string | boolean | IRegisterRes | ILoginRes | any }

const userReducer = (state = initial, action: IAction): IStore => {
    switch (action.type) {
        case "loading": return { ...state, loading: true, errors: null }

        case "errors": return { ...state, loading: false, errors: action.payload }

        case "authentification_reussie":
        case "connexion_reussie":
        case "validation_reussie": return { ...state, auth: action.payload, temp: true, errors: null, loading: false }

        case "inscription_reussie": return { ...state, user: action.payload.user, username: action.payload.username, temp: true, errors: null, loading: false }
        case "forget_reussie": return { ...state, code: action.payload.code, username: action.payload.username, temp: true, errors: null, loading: false }

        case "getcode_reussie": return { ...state, code: action.payload, errors: null, loading: false }

        case "reset_reussie":
        case "verify_reussie": return { ...state, temp: action.payload, errors: null, loading: false }

        case "deconnexion_reussie": return initial

        case "reset_temp": return { ...state, temp: false }
        case "reset_errors": return { ...state, errors: null }
        case "reset_username": return { ...state, username: null }



        default: return state
    }
}

export default userReducer