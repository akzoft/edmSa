import axios from "axios"
import { api } from "../api"
import { ICompteur } from "../../others/models"

export const create_compteur = (data: ICompteur, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "c_loading" })
        const ans = await axios.post(`${api}/compteurs`, data, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "create_compteur_reussie", payload: ans.data })
    } catch (error: any) {
        console.log(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const update_compteur = (id: string, data: ICompteur, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "c_loading" })
        const ans = await axios.put(`${api}/compteurs/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "update_compteur_reussie", payload: ans.data })
    } catch (error: any) {
        console.log(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const delete_compteur = (id: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "c_loading" })
        const ans = await axios.delete(`${api}/compteurs/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        console.log(ans.data)
        dispatch({ type: "delete_compteur_reussie", payload: ans.data })
    } catch (error: any) {
        console.log(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}


export const getAllCompteur = (userId: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "c_loading" })
        const ans = await axios.get(`${api}/compteurs/${userId}/all`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_all_compteur_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const getAllCompteurClassic = (userId: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "c_loading" })
        const ans = await axios.get(`${api}/compteurs/${userId}/post-paid`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_all_compteur_classic_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const getAllCompteurISAGO = (userId: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "c_loading" })
        const ans = await axios.get(`${api}/compteurs/${userId}/pre-paid`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_all_compteur_isago_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}





//usr_q8QKn7GyME