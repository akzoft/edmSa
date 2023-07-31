import { IAssistanceModel, IAssistanceStore } from "../../others/models"




const initial: IAssistanceStore = { assistance_loading: false, errors: null, assistance: null, assistances: [], assistance_temp: false, assistance_tmp: false }
interface IAction { type: string; payload: string | boolean | IAssistanceModel | IAssistanceModel[] | any }

const assistanceReducer = (state = initial, action: IAction): IAssistanceStore => {
    switch (action.type) {
        case "assistance_loading": return { ...state, assistance_loading: true, errors: null }
        case "errors": return { ...state, assistance_loading: false, errors: action.payload }

        case 'send_assistance_success': return { ...state, assistances: [...state.assistances, action.payload], assistance_temp: true, errors: null, assistance_loading: false }
        case "get_all_assistance_chats": return { ...state, assistances: action.payload, assistance_tmp: true, errors: null, assistance_loading: false }

        case "get_one_assistance": return { ...state, assistance: action.payload.user, assistance_tmp: true, errors: null, assistance_loading: false }

        case "reset_errors": return { ...state, errors: null }
        case "reset_assistance_tmp": return { ...state, assistance_tmp: false }

        default: return state
    }
}

export default assistanceReducer