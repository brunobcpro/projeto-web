import { IonApp, IonButton, IonCol, IonContent, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";

const Logout: React.FC = () => {
    const history = useHistory();

    const Sair = () => {
        history.push('/')
    }

    return(
        
            <IonButton  onClick={Sair}>Encerrar sessão</IonButton>
    )
}
export default Logout