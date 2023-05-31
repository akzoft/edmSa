import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "../api"
import { Expired, empty } from "../../others/functions"
import { ILoginRes, IRegisterReq, IResetReq, IValidation, IVerify } from "../../others/models"
import { verify_validation } from "../../others/validations"

export const checking = () => async (dispatch: any) => {
    try {
        const data = await AsyncStorage.getItem("user")

        if (data && !empty(data)) {
            const p_data = JSON.parse(data)

            if (p_data && !empty(p_data)) {
                const user: ILoginRes = p_data?.user
                if (user && !empty(user))
                    if (Expired(user?.expiresIn)) {
                        const ans = await axios.delete(`${api}/auth/logout/${user?.deviceId}`)
                        if (ans?.data) {
                            await AsyncStorage.removeItem("user")
                            dispatch({ type: "deconnexion_reussie", payload: null })
                        }
                    } else {
                        dispatch({ type: "authentification_reussie", payload: user })
                    }
            }
        }
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const inscription = (data: IRegisterReq) => async (dispatch: any) => {
    try {
        const ans = await axios.post(`${api}/auth/signup`, data)
        console.log(ans.data)
        dispatch({ type: "inscription_reussie", payload: { user: ans.data, username: data.username } })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const validation = (data: IValidation) => async (dispatch: any) => {
    try {
        const ans = await axios.post(`${api}/auth/confirm`, data)
        await AsyncStorage.setItem("user", JSON.stringify({ user: ans.data }))
        dispatch({ type: "validation_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const connexion = (data: any) => async (dispatch: any) => {
    try {
        dispatch({ type: "loading" })
        const ans = await axios.post(`${api}/auth/login`, data)
        // const expirationTime = new Date().getTime() + ans.data.expiresIn * 1000;
        const expirationTime = new Date().getTime() + ans.data.expiresIn * 1000 * 1000 * 60 * 60;
        ans.data.expiresIn = expirationTime;
        await AsyncStorage.setItem("user", JSON.stringify({ user: ans.data }))
        dispatch({ type: "connexion_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const forget = (username: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "loading" })
        const ans = await axios.get(`${api}/auth/password/${username}/mobile`)
        console.log(ans.data)
        dispatch({ type: "forget_reussie", payload: { code: ans.data, username } })
    } catch (error: any) {
        console.log("error ", error?.response?.data?._embedded?.errors[0]?.message || error?.response?.data)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const getCode = (username: string) => async (dispatch: any) => {
    try {
        dispatch({ type: "loading" })
        const ans = await axios.get(`${api}/auth/password/${username}/mobile`)
        console.log(ans.data)
        dispatch({ type: "getcode_reussie", payload: ans.data })
    } catch (error: any) {
        console.log("error ", error?.response?.data?._embedded?.errors[0]?.message || error?.response?.data)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const verify = (data: IVerify, codePIn: number) => async (dispatch: any) => {
    try {
        dispatch({ type: "loading" })

        if (verify_validation(data, codePIn) !== "") throw verify_validation(data, codePIn);

        dispatch({ type: "verify_reussie", payload: true })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error })
    }
}

export const reset = (data: IResetReq) => async (dispatch: any) => {
    try {
        dispatch({ type: "loading" })
        const ans = await axios.post(`${api}/auth/password/reset`, data)
        dispatch({ type: "reset_reussie", payload: ans.data })
    } catch (error: any) {
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}

export const get = () => async (dispatch: any) => {
    try {
        const ans = await axios.get(`${api}/auth/user-agent`)
        console.log("ans ", ans.data)
    } catch (error: any) {
        console.log(error?.response.data)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}






export const deconnexion = () => async (dispatch: any) => {
    try {
        const data = await AsyncStorage.getItem("user")
        if (data && !empty(data)) {
            const p_data = JSON.parse(data)

            if (p_data && !empty(p_data)) {
                const user: ILoginRes = p_data?.user

                if (user && !empty(user)) {
                    const ans = await axios.delete(`${api}/auth/logout/${user?.deviceId}`)
                    if (ans?.data) {
                        await AsyncStorage.removeItem("user")
                        dispatch({ type: "deconnexion_reussie", payload: null })
                    }
                }
            }
        }
    } catch (error: any) {
        console.log(error?.response?.data?._embedded?.errors[0]?.message)
        dispatch({ type: "errors", payload: error?.response?.data?._embedded?.errors[0]?.message })
    }
}