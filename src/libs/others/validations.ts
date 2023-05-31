import { ILoginReq, IRegisterReq, IResetReq, IVerify } from "./models";

export const register_validation = (inputs: IRegisterReq) => {
    var error = ""
    if (!inputs.name || inputs.name === "") error = "Un nom est requis."; else
        if (!inputs.username || inputs.username === "") error = "Un nom d'utilisateur est requis."; else
            if (!inputs.phone || inputs.phone === "") error = "Un numéro de téléphone est requis."; else
                if (inputs.phone && !/(^(\+223|00223)?[5-9]{1}[0-9]{7}$)/.test(inputs.phone.toString())) error = "Format du numéro de téléphone incorrect."; else
                    if (inputs.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.email.toString())) error = "Format email incorrect."; else
                        if (!inputs.password || inputs.password === "") error = "Un mot de passe est requis."; else
                            if (inputs.password && inputs.password.length < 6) error = "Mot de passe trop court. 6 caractères au minimum."

    return error;
}

export const login_validation = (inputs: ILoginReq) => {
    var error = ""
    if (!inputs.username || inputs.username === "") error = "Un nom d'utilisateur est requis."; else
        if (!inputs.password || inputs.password === "") error = "Un mot de passe est requis."; else
            if (inputs.password && inputs.password.length < 6) error = "Mot de passe trop court. 6 caractères au minimum."

    return error;
}

export const verify_validation = (inputs: IVerify, codePin: number) => {
    var error = ""
    if (!inputs.pin || inputs.pin === 0) error = ("Le code de vérification est requis."); else
        if (inputs.pin && inputs.pin !== codePin) error = "Code de vérification incorrect."

    return error;
}

export const reset_validation = (inputs: IResetReq) => {
    var error = ""
    if (!inputs.password || inputs.password === "") error = "Un mot de passe est requis."; else
        if (inputs.password && inputs.password.length < 6) error = "Mot de passe trop court. 6 caractères au minimum."; else
            if (inputs.confirm !== inputs.password) error = "Les mots de passe ne se correspondent pas.";

    return error;
}
