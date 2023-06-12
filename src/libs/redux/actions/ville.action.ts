import axios from "axios"
import { api } from "../api"

export const getVilles = (token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "v_loading" })
        const ans = await axios.get(`${api}/cities`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_all_ville_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}
