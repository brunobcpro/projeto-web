import { IonApp, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Tab from "../components/Tab-componente";
import axios from "axios";
import CompInsumos from "../components/CompInsumos";

const AdmInsumos: React.FC = () => {

    return(
        <IonApp>
            <IonContent>
                <CompInsumos nome={""} unidade={""} estoque={0} id={0} />
            </IonContent>
        </IonApp>
    )
}

export default AdmInsumos