import { IonApp, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import Tab from "../components/Tab-componente";

const FuncionarioInsumos: React.FC = () => {
    return(
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Aqui está a situação dos insumos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <Tab/>
        </IonApp>
    )
}

export default FuncionarioInsumos