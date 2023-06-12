import { IDevisReq, ILoginReq, IRegisterReq, IResetReq, IVerify } from "./models";

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

export const devis_validation1 = (inputs: IDevisReq) => {

    var error = ""
    if (!inputs.typeCompteur || inputs.typeCompteur === "") error = "Un type de compteur est requis."; else
        if (!inputs.typeDemande || inputs.typeDemande === "") error = "Un type de demande est requis."; else
            if (!inputs.usage || inputs.usage === "") error = "L'usage du compteur est requis.";

    console.log(error)
    return error;
}

export const devis_validation2 = (inputs: IDevisReq) => {
    var error = ""
    if (!inputs.civilite || inputs.civilite === "") error = "Choisissez une civilité."; else
        if (!inputs.typeIdentification || inputs.typeIdentification === "") error = "Le type d'identification est requis"; else
            if (!inputs.numeroIdentification || inputs.numeroIdentification === "") error = "Le numéro d'identification est requis"; else
                if (!inputs.nom || inputs.nom === "") error = "Le nom est requis"; else
                    if (!inputs.prenom || inputs.prenom === "") error = "Le prénom est requis"; else
                        if (!inputs.telephoneMobile || inputs.telephoneMobile === "") error = "Le numéro de téléphone est requis";
    return error;
}


export const devis_validation3 = (inputs: IDevisReq) => {
    var error = ""
    if (!inputs.proTitrePropriete || inputs.proTitrePropriete === "") error = "Le titre de propriété est requis"; else
        if (!inputs.quittusEdm || inputs.quittusEdm === "") error = "Le quitus d'EDM est requis"; else
            if (!inputs.proCopieIdentite || inputs.proCopieIdentite === "") error = "La carte ID ou Nina ou PP est requise"; else
                if (!inputs.proCopieVisa || inputs.proCopieVisa === "") error = "La copie VISA est requise";

    return error;
}

export const file_size_validation = (file: any) => {
    var error = ""
    if (file?.proTitrePropriete?.size > 10000000) error = `La taille de l'image "titre de propriété" ne doit pas dépasser 10MB.`; else
        if (file?.quittusEdm?.size > 10000000) error = `La taille de l'image "Quitus EDM" ne doit pas dépasser 10MB.`; else
            if (file?.proCopieIdentite?.size > 10000000) error = `La taille de l'image "Copie carte d'ID/NINA/PP" ne doit pas dépasser 10MB.`; else
                if (file?.proCopieVisa?.size > 10000000) error = `La taille de l'image "Copie visa" ne doit pas dépasser 10MB.`; else

                    if (file?.locTitrePropriete?.size > 10000000) error = `La taille de l'image "titre de propriété locataire" ne doit pas dépasser 10MB.`; else
                        if (file?.autBranchement?.size > 10000000) error = `La taille de l'image "Attestation de branchement" ne doit pas dépasser 10MB.`; else
                            if (file?.locCopieIdentiteProprietaire?.size > 10000000) error = `La taille de l'image "Copie carte d'ID/NINA/PP propriétaire" ne doit pas dépasser 10MB.`; else
                                if (file?.locCopieIdentiteLocataire?.size > 10000000) error = `La taille de l'image "Copie carte d'ID/NINA/PP  locataire" ne doit pas dépasser 10MB.`; else
                                    if (file?.locCopieVisa?.size > 10000000) error = `La taille de l'image "Copie visa locataire" ne doit pas dépasser 10MB.`;
    return error;
}

export const devis_validation4 = (inputs: IDevisReq) => {
    var error = ""
    if (!inputs.villeId || inputs.villeId === "") error = "La ville est requise"; else
        if (!inputs.commune || inputs.commune === "") error = "La commune est requise"; else
            if (!inputs.quartier || inputs.quartier === "") error = "Le quartier est requis.";

    return error;
}



