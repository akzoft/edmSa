import axios from "axios"
import { api } from "../api"

export const getAllActualites = (token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "actu_loading" })
        const ans = await axios.get(`${api}/actualities`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_all_actu_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const getOneActualite = (id: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "actu_loading" })
        const ans = await axios.get(`${api}/actualities/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_actu_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}
