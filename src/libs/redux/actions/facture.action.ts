import axios from "axios"
import { api } from "../api"
import { IFactureSearchReq } from "../../others/models"

export const getAllFacture = (userId: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "facture_loading" })
        const ans = await axios.get(`${api}/invoices/${userId}/customer`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_factures_reussie", payload: ans.data })
    } catch (error: any) {
        console.log("error get all facture: ", error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const searchFacture = (data: IFactureSearchReq, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "facture_loading" })

        const ans = await axios.post(`${api}/invoices`, data, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: "search_facture_reussie", payload: ans.data })
    } catch (error: any) {
        console.log("error search facture: ", error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const paiement_facture = (data: IFactureSearchReq, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "facture_loading" })

        const ans = await axios.post(`${api}/invoices/payment`, data, { headers: { Authorization: `Bearer ${token}` } })
        console.log(ans.data)
        dispatch({ type: "paiement_facture_reussie", payload: ans.data })
    } catch (error: any) {
        console.log("error paiement facture: ", error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}