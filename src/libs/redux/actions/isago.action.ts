import axios from "axios"
import { api } from "../api"
import { IISAGOreq, IISAGOsearch } from "../../others/models"

export const getAllISAGO = (userId: string, token: string) => async (dispatch: any) => {
    try {

        dispatch({ type: "isago_loading" })
        const ans = await axios.get(`${api}/isago/${userId}/customer`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_isagos_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const searchISAGO = (data: IISAGOsearch, token: string) => async (dispatch: any) => {
    try {

        dispatch({ type: "isago_loading" })
        const ans = await axios.post(`${api}/isago`, data, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "search_isago_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const paiement_isago = (data: IISAGOreq, token: string) => async (dispatch: any) => {
    try {

        dispatch({ type: "isago_loading" })

        const ans = await axios.post(`${api}/isago/payment`, data, { headers: { Authorization: `Bearer ${token}` } })
        console.log(ans.data)
        dispatch({ type: "paiement_isago_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}