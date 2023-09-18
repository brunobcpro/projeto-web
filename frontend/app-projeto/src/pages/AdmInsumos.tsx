import { IonApp, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import Logout from "../components/Logout";
import Tab from "../components/Tab-componente";

const AdmInsumos: React.FC = () =>{
    return(
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Aqui está a situação dos insumos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Logout/>
            </IonContent>
            <Tab/>
        </IonApp>
    )
}

export default AdmInsumos