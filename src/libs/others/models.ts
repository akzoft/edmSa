interface IRegisterReq { name: string; username: string; email: string; phone: string; password: string, quarterId?: string }
interface IRegisterRes { id: string; name: string; username: string; email: string; phone: string; enabled: boolean; confirm: number; role: string, quartier?: { name: string, id: string, commune?: { id?: string, name?: string, city?: IVille } | null } }
interface ILoginReq { username: string; password: string; mobile: boolean; deviceId?: string }
interface ILoginRes { confirm?: any, accessToken: string; tokenType: string; expiresIn: number; id: string; username: string; name: string; phone: string, deviceId: string, email?: string }
interface IValidation { userId: string; deviceId: string; pin: string; }
interface IVerify { id: string, type: string, pin: number }
interface IResetReq { id?: string, type?: string, pin?: number, confirm: string, password: string }
interface IStore { edm_news?: any, edm_actus?: any, user_loading: boolean, errors: string | null, user: IRegisterRes | null, auth: ILoginRes | null, temp: boolean, temps: boolean, code: { id: string, pin: number }, username?: string | null }

interface IDevisReq { motif?: string, amount?: number, id?: string, status?: string, typeCompteur?: string, typeDemande?: string, usage: string, climatiseur?: number, ventilateur?: number, machineLaver?: number, ampoule?: number, chauffeEau?: number, ordinateur?: number, telephone?: number, congelateur?: number, refrigerateur?: number, televiseur?: number, bouilloireElectrique?: number, ferRepasser?: number, autre?: number, civilite: string | undefined, nom: string, prenom: string, nomJeuneFille: string, profession: string, typeIdentification: string | undefined, numeroIdentification: string, telephoneMobile: string | undefined, telephoneFixe: string, email: string, ville?: IVille, villeId: string | undefined, commune: string | undefined, quartier: string | undefined, rue: string, porte?: number, lot: string, procheDe: string, customerId: string | undefined, proTitrePropriete: any, quittusEdm: any, proCopieIdentite: any, proCopieVisa: any, locTitrePropriete?: any, autBranchement?: any, locCopieIdentiteProprietaire?: any, locCopieIdentiteLocataire?: any, locCopieVisa?: any, localisation?: string, paymentStatus?: string }
interface IDevisStore { notif?: string, ok?: string, s_loading: boolean, errors: string | null | undefined, devi: IDevisReq | null, devis: IDevisReq[], tmp: boolean }
interface IDevisPayment { id?: string, phone: number }

interface IInfoRes { id: string, title: string, content: string, image?: string }
interface IInfoStore { info_loading: boolean, errors: string | null, info: IInfoRes | null, infos: IInfoRes[], tmp: boolean }

interface IActualite { id: string, title: string, content: string, image?: string }
interface IActualiteStore { actu_loading: boolean, errors: string | null, actualite: IActualite | null, actualites: IActualite[], tmp: boolean }

interface INotification { id: string, title: string, message: string, readed: boolean, createdAt: Date, updatedAt: Date }
interface INotificationStore { loading: boolean, errors: string | null, notification: INotification | null, notifications: INotification[], tmp: boolean }

interface IVille { name: string, id: string }
interface IVillestore { ville_loading: boolean, errors: string | null, villes: IVille[] }

interface IQuartier { name: string, id: string, commune?: { id?: string, name?: string, city?: IVille } | null }
interface IQuartierstore { quartier_loading: boolean, errors: string | null, quartiers: IQuartier[] }

interface IFactureSearchReq { ref: string | undefined, customerId: string | undefined, }
interface IFactureReq { phone?: number, id: string, invoice: string, compteur: string, owner: string, address: string, amountPaid?: number, ref: string, telephone?: number, status: string, customerId: string, createdAt?: Date, updatedAt?: Date, amountToBePaid?: number }
interface IFactureStore { notif?: string, ok: "", facture_loading: boolean, errors: string | null, facture: IFactureReq | null, factures: IFactureReq[], tmp: boolean }

interface IISAGOsearch { compteur: string | undefined, customerId: string | undefined, }
interface IISAGOreq { compteur: string, owner: string, address: string, customerCode: string, amount: number, phone: number, customerId: string, status?: string, }
interface IISAGOres { id: string, compteur: string, owner: string, address: string, customerCode: string, amount?: number, phone?: string, rechargeCode?: string, status: string, customerId: string, createdAt?: Date, updatedAt?: Date }
interface IISAGOstore { ok: "", notif?: string, isago_loading: boolean, errors: string | null, isago: IISAGOreq | null, isagos: IISAGOreq[], tmp: boolean }

interface IAssistanceModel { counter: string, type: string, message: string, latitude: string, longitude: string, customerId: string, }
interface IAssistanceStore { errors: string | null, assistance_loading: boolean, assistance: IAssistanceModel | null, assistances: IAssistanceModel[], assistance_tmp: boolean, assistance_temp: boolean }

interface IHistorique {
    phone?: number, id: string, invoice: string, compteur: string, owner: string, address: string, amountPaid?: number, ref: string, telephone?: number, status: string, customerId: string, createdAt?: Date, updatedAt?: Date, amountToBePaid?: number,
    customerCode: string, amount?: number, rechargeCode?: string, nbKw?: number,
    typeCompteur?: string, typeDemande?: string, usage: string, climatiseur?: number, ventilateur?: number, machineLaver?: number, ampoule?: number, chauffeEau?: number, ordinateur?: number, congelateur?: number, refrigerateur?: number, televiseur?: number, bouilloireElectrique?: number, ferRepasser?: number, autre?: number, civilite: string | undefined, nom: string, prenom: string, nomJeuneFille: string, profession: string, typeIdentification: string | undefined, numeroIdentification: string, telephoneMobile: string | undefined, telephoneFixe: string, email: string, ville?: IVille, villeId: string | undefined, commune: string | undefined, quartier: string | undefined, rue: string, porte?: number, lot: string, procheDe: string, proTitrePropriete: any, quittusEdm: any, proCopieIdentite: any, proCopieVisa: any, locTitrePropriete?: any, autBranchement?: any, locCopieIdentiteProprietaire?: any, locCopieIdentiteLocataire?: any, locCopieVisa?: any, localisation?: string, paymentStatus?: string
}

type TCompteurType = { ISAGO: string, CLASSIC: string }
interface ICompteur { customerId?: string, id: string, label: string, number: string, type: string }
interface ICompteurStore {
    temp: boolean, tmp_del: boolean,
    c_loading: boolean, compteur: ICompteur | null, compteurs: ICompteur[], isago_cpt: ICompteur[],
    classics_cpt: ICompteur[], errors: string | null, tmp: boolean
}

export type {
    IDevisPayment, IHistorique, IISAGOreq, IISAGOsearch, IISAGOres, IISAGOstore, IFactureStore,
    IFactureSearchReq, IFactureReq, IDevisStore, IVille, IVillestore, INotification, INotificationStore,
    IRegisterReq, IRegisterRes, ILoginReq, ILoginRes, IValidation, IVerify, IResetReq, IStore, IInfoStore,
    IInfoRes, IActualiteStore, IActualite, IDevisReq, ICompteur, ICompteurStore, TCompteurType, IAssistanceModel, IAssistanceStore, IQuartier,
    IQuartierstore
}