import axios from "axios"
import { api } from "../api"

export const getAllNotifications = (userId: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "n_loading" })
        const ans = await axios.get(`${api}/notifications/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_all_notifs_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}


export const ReadNotification = (id: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "n_loading" })
        const ans = await axios.get(`${api}/notifications/${id}/read`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_notif_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const deleteOneNotification = (id: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "n_loading" })
        const ans = await axios.delete(`${api}/notifications/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "delete_notif_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}
