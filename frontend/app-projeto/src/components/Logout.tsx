import { IonApp, IonButton, IonCol, IonContent, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";

const Logout: React.FC = () => {
    const history = useHistory();

    const Sair = () => {
        history.push('/')
    }

    return(
    <IonApp>
        <IonContent>
         <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <IonButton  onClick={Sair}>Encerrar sessão</IonButton>
        </div>
        </IonContent>
    </IonApp>
    )
}
export default Logout