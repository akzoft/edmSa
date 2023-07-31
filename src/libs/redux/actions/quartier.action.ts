import axios from "axios"
import { api } from "../api"

export const getQuartiers = () => async (dispatch: any) => {
    try {
        dispatch({ type: "quartier_loading" })
        const ans = await axios.get(`${api}/quarters`)
        dispatch({ type: "get_all_quartier_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}
