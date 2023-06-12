import Actualite from "./actualite/Actualite";
import Forgot from "./auth/Forgot";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Reset from "./auth/Reset";
import Validation from "./auth/Validation";
import Verification from "./auth/Verification";
import DemandeDevis from "./devis/DemandeDevis";
import Devis from "./devis/Devis";
import DevisDetails from "./devis/DevisDetails";
import DevisList from "./devis/DevisList";
import PaiementDevis from "./devis/PaiementDevis";
import PayerUnDevis from "./devis/PayerUnDevis";
import ListeFacture from "./facture/ListeFacture";
import PaiementFacture from "./facture/PaiementFacture";
import RechercheFacture from "./facture/RechercheFacture";
import Historique from "./historique/Historique";
import Infos from "./info/Infos";
import PaiementISAGO from "./isago/PaiementISAGO";
import RechercheCompteurISAGO from "./isago/RechercheCompteurISAGO";
import Assistance from "./main/Assistance";
import Home from "./main/Home";
import Notification from "./main/Notification";
import DetailNotification from "./notification/DetailNotification";
import Parametre from "./parametre/Parametre";


export {
    Home, Assistance, Notification,
    Login, Register, Forgot, Verification, Reset, Validation, Devis,
    RechercheCompteurISAGO, PaiementISAGO, RechercheFacture, PaiementFacture,
    DemandeDevis, Infos, Actualite, DetailNotification, DevisList,
    PaiementDevis, DevisDetails, ListeFacture, Historique, PayerUnDevis, Parametre
}