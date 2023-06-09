import { IInfoRes, IInfoStore } from "../../others/models"


const initial: IInfoStore = { info_loading: false, errors: null, info: null, infos: [], tmp: false }
interface IAction { type: string; payload: string | boolean | IInfoRes | IInfoRes[] | any }

const infoReducer = (state = initial, action: IAction): IInfoStore => {
    switch (action.type) {
        case "info_loading": return { ...state, info_loading: true, errors: null }

        case "errors": return { ...state, info_loading: false, errors: action.payload }

        case "get_all_infos_reussie": return { ...state, infos: action.payload, tmp: true, errors: null, info_loading: false }

        case "get_info_reussie": return { ...state, info: action.payload.user, tmp: true, errors: null, info_loading: false }

        case "reset_errors": return { ...state, errors: null }
        case "reset_tmp": return { ...state, tmp: false }

        default: return state
    }
}

export default infoReducer