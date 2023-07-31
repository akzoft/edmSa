import { IQuartier, IQuartierstore } from "../../others/models";




const initial: IQuartierstore = { quartier_loading: false, errors: null, quartiers: [] }
interface IAction { type: string; payload: string | IQuartier | IQuartier[] | any }

const quartierReducer = (state = initial, action: IAction): IQuartierstore => {
    switch (action.type) {
        case "quartier_loading": return { ...state, quartier_loading: true, errors: null }

        case "errors": return { ...state, quartier_loading: false, errors: action.payload }

        case "get_all_quartier_reussie": return { ...state, quartiers: action.payload, errors: null, quartier_loading: false }


        case "reset_errors": return { ...state, errors: null }

        default: return state
    }
}

export default quartierReducer