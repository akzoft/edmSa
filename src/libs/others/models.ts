interface IRegisterReq { name: string; username: string; email: string; phone: string; password: string }
interface IRegisterRes { id: string; name: string; username: string; email: string; phone: string; enabled: boolean; confirm: number; role: string }
interface ILoginReq { username: string; password: string; mobile: boolean; deviceId?: string }
interface ILoginRes { accessToken: string; tokenType: string; expiresIn: number; id: string; username: string; name: string; phone: string, deviceId: string, email?: string }
interface IValidation { userId: string; deviceId: string; pin: string; }
interface IVerify { id: string, type: string, pin: number }
interface IResetReq { id?: string, type?: string, pin?: number, confirm: string, password: string }
interface IStore { loading: boolean, errors: string | null, user: IRegisterRes | null, auth: ILoginRes | null, temp: boolean, code: { id: string, pin: number }, username?: string | null }


interface IInfoRes { id: string, title: string, content: string, image?: string }
interface IInfoStore { loading: boolean, errors: string | null, info: IInfoRes | null, infos: IInfoRes[], tmp: boolean }

interface IActualite { id: string, title: string, content: string, image?: string }
interface IActualiteStore { loading: boolean, errors: string | null, actualite: IActualite | null, actualites: IActualite[], tmp: boolean }

interface INotification { id: string, title: string, message: string, readed: boolean, createdAt: Date, updatedAt: Date }
interface INotificationStore { loading: boolean, errors: string | null, notification: INotification | null, notifications: INotification[], tmp: boolean }


export type { INotification, INotificationStore, IRegisterReq, IRegisterRes, ILoginReq, ILoginRes, IValidation, IVerify, IResetReq, IStore, IInfoStore, IInfoRes, IActualiteStore, IActualite }