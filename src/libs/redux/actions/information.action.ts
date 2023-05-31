import axios from "axios"
import { api } from "../api"

export const getAllInformations = (token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "loading" })
        const ans = await axios.get(`${api}/informations`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_all_infos_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}


export const getOneInformation = (id: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "loading" })
        const ans = await axios.get(`${api}/informations/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        console.log("ans ", ans.data)
        dispatch({ type: "get_info_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}
