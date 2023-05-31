import messaging from '@react-native-firebase/messaging'


export const empty = (value: any) => value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) || (typeof value === "string" && value.trim().length === 0);

export const handleChangeMobile = (key: string, value: string, setInputs: any) => { setInputs((prevState: any) => ({ ...prevState, [key]: value, })) }

export const areIn = (arr1: [], arr2: []) => {
    return arr1?.some((arr) => arr2?.includes(arr))
}

export const phoneInputFormat = (numero: string, separator?: string) => {
    var numeroSansCaracteres = numero.replace(/\D/g, '');
    var groupes = numeroSansCaracteres.match(/(\d{2})/g);
    var numeroSepare = groupes?.join('-');
    return numeroSepare;
}

export const phoneOutputFormat = (numero: string) => {
    var numeroSansSeparateur = numero.replace(/-/g, '');
    return numeroSansSeparateur;
}

export const removePhoneIndicatif = (numero: string) => {
    var indicatif1 = "+223"
    var indicatif2 = "00223"
    if (numero.startsWith(indicatif1)) {
        return numero.slice(indicatif1.length)
    } else if (numero.startsWith(indicatif2))
        return numero.slice(indicatif2.length)
    else {
        return numero
    }
}
export const formatNumberWithSpaces = (data: string) => data?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

export function convertDateToMillis(date: string | number | Date) {
    return new Date(date).getTime()
}

export function ExpirationVerify(date: string | number | Date) {
    const isExpired = convertDateToMillis(date) - new Date().getTime()
    return isExpired > 0 ? false : true
}

export function Expired(date: number) {
    return date < new Date().getTime()
}

export const comparaison = (a: any, b: any) => {
    if (a.createdAt < b.createdAt) {
        return -1;
    }
    if (a.createdAt > b.createdAt) {
        return 1;
    }
    return 0;
};

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission()
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
        if (enabled) {
            let i = 0
            if (i === 0) {
                i = i + 1
                messaging().subscribeToTopic('EDM_News')
                    .then(() => console.log('Subscribed to topic!'));
            }
        }
    }
}

export const notificationListener = () => {
    // Check whether an initial notification is available
    messaging().getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                )
            }
        })

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging()
        .onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            )
        })

    messaging().onMessage(async remoteMessage => { })
}
