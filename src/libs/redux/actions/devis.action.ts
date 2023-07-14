import axios from "axios"
import { IDevisPayment } from "../../others/models"
import { api } from "../api"

export const create_devis = (data: FormData, token: string) => async (dispatch: any) => {
    try {
        console.log("create")
        dispatch({ type: "d_loading" })
        const ans = await axios.post(`${api}/devis`, data, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
        console.log(ans.data)
        dispatch({ type: "create_devis_reussie", payload: ans.data })
    } catch (error: any) {
        console.log(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const getAllDevi = (userId: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "d_loading" })
        const ans = await axios.get(`${api}/devis/${userId}/customer`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_all_devis_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

// export const getDevi = (data: any, token: string) => async (dispatch: any) => {
//     try {
//         dispatch({ type: "d_loading" })
//         const ans = await axios.post(`${api}/auth/confirm`, data, { headers: { Authorization: `Bearer ${token}` } })

//         dispatch({ type: "validation_reussie", payload: ans.data })
//     } catch (error: any) {
//         dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
//     }
// }

export const paiement_devis = (data: IDevisPayment, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "d_loading" })
        const ans = await axios.post(`${api}/devis/payment`, data, { headers: { Authorization: `Bearer ${token}` } })
        console.log(ans.data)
        dispatch({ type: "paiement_devis_reussie", payload: ans.data })
    } catch (error: any) {
        console.log(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

//usr_q8QKn7GyME