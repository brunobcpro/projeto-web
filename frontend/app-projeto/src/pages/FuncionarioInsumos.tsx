import { IonApp, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import Tab from "../components/Tab-componente";
import CompInsumos from "../components/CompInsumos";

const FuncionarioInsumos: React.FC = () => {
    return(
        <IonApp>
            <CompInsumos nome={""} unidade={""} estoque={0} id={0} />
        </IonApp>
    )
}

export default FuncionarioInsumos