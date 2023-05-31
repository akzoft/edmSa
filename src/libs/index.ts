import RootNavigation from "./navigations/RootNavigation";
import Store, { RootState } from "./redux/Store";
import { INotification, INotificationStore, IRegisterReq, IActualiteStore, IActualite, IRegisterRes, ILoginReq, ILoginRes, IValidation, IVerify, IStore, IResetReq, IInfoRes } from "./others/models"
import { images } from "./others/images";
import { colors } from "./others/typography";
import { comparaison, empty, handleChangeMobile, Expired, removePhoneIndicatif } from "./others/functions";
import { checking, connexion, deconnexion, forget, inscription, validation, reset, verify, getCode } from "./redux/actions/user.action";
import { login_validation, register_validation, reset_validation, verify_validation } from "./others/validations";
import { css } from "./others/css";
import { getAllInformations, getOneInformation } from "./redux/actions/information.action";
import { api_fichiers } from "./redux/api";
import { getAllActualites } from "./redux/actions/actualite.action";
import { deleteOneNotification, getAllNotifications, ReadNotification } from "./redux/actions/notification.action";

export {
    RootNavigation, Store, images, colors, empty, handleChangeMobile, removePhoneIndicatif, Expired,
    checking, inscription, connexion, validation, register_validation, login_validation, css,
    deconnexion, forget, reset, verify_validation, reset_validation, verify, getCode,
    getAllInformations, getOneInformation, api_fichiers, getAllActualites, getAllNotifications,
    ReadNotification, comparaison,
    deleteOneNotification,
}

export type { INotification, INotificationStore, IActualite, IActualiteStore, IRegisterReq, IRegisterRes, ILoginReq, ILoginRes, IValidation, IVerify, IStore, IResetReq, RootState, IInfoRes }

