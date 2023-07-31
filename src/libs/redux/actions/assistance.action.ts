import axios from "axios"
import { api } from "../api"
import { IAssistanceModel } from "../../others/models"

export const sendAssistance = (toStore: IAssistanceModel, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "assistance_loading" })
        const ans = await axios.post(`${api}/assistances`, toStore, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "send_assistance_success", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}


export const get_all_assistance_chats = (customerId: string, token: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "assistance_loading" })
        const ans = await axios.get(`${api}/assistances/${customerId}/all`, { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: "get_all_assistance_chats", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}
