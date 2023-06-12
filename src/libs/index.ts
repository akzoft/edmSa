import RootNavigation from "./navigations/RootNavigation";
import Store, { RootState } from "./redux/Store";
import { TCompteurType, ICompteurStore, ICompteur, IDevisPayment, IHistorique, IISAGOreq, IISAGOsearch, IISAGOres, IISAGOstore, IFactureReq, IVille, IVillestore, IDevisReq, INotification, INotificationStore, IRegisterReq, IActualiteStore, IActualite, IRegisterRes, ILoginReq, ILoginRes, IValidation, IVerify, IStore, IResetReq, IInfoRes } from "./others/models"
import { images } from "./others/images";
import { colors } from "./others/typography";
import { comparaison, empty, handleChangeMobile, Expired, removePhoneIndicatif, reverseArray } from "./others/functions";
import { checking, connexion, deconnexion, forget, inscription, validation, reset, verify, getCode } from "./redux/actions/user.action";
import { devis_validation1, devis_validation2, devis_validation3, devis_validation4, file_size_validation, login_validation, register_validation, reset_validation, verify_validation } from "./others/validations";
import { css } from "./others/css";
import { getAllInformations, getOneInformation } from "./redux/actions/information.action";
import { api_fichiers } from "./redux/api";
import { getAllActualites } from "./redux/actions/actualite.action";
import { deleteOneNotification, getAllNotifications, ReadNotification } from "./redux/actions/notification.action";
import { civilite, typeID, type_compteur, type_demande, usage } from "./others/constants";
import { getVilles } from "./redux/actions/ville.action";
import { create_devis, getAllDevi, paiement_devis } from "./redux/actions/devis.action";
import { getAllFacture, paiement_facture, searchFacture } from "./redux/actions/facture.action";
import { getAllISAGO, paiement_isago, searchISAGO } from "./redux/actions/isago.action";
import { create_compteur, delete_compteur, getAllCompteur, update_compteur } from "./redux/actions/compteur.action";

export {
    type_compteur, type_demande, usage, civilite, typeID, api_fichiers, Store, images, colors, css,
    RootNavigation, empty, handleChangeMobile, removePhoneIndicatif, Expired,
    checking, inscription, connexion, validation, register_validation, login_validation,
    deconnexion, forget, reset, verify_validation, reset_validation, verify, getCode,
    getAllInformations, getOneInformation, getAllActualites, getAllNotifications,
    ReadNotification, comparaison, reverseArray,
    deleteOneNotification, getVilles, devis_validation4, create_devis, getAllDevi,
    devis_validation1,
    devis_validation2, devis_validation3, getAllFacture, searchFacture, paiement_facture,
    getAllISAGO, searchISAGO, paiement_isago, paiement_devis, create_compteur, getAllCompteur, update_compteur, delete_compteur, file_size_validation
}



export type {
    IDevisPayment, IHistorique, IISAGOreq, IISAGOsearch, IISAGOres, IISAGOstore, IFactureReq,
    IVille, IVillestore, IDevisReq, INotification, INotificationStore, IActualite, IActualiteStore, IRegisterReq,
    IRegisterRes, ILoginReq, ILoginRes, IValidation, IVerify, IStore, IResetReq, RootState, IInfoRes, ICompteur,
    ICompteurStore, TCompteurType
}

