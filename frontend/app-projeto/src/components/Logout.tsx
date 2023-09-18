import { IonApp, IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";

const Logout: React.FC = () => {
    const history = useHistory();

    const Sair = () => {
        history.push('/')
    }

    return(
    <IonApp>
        <IonGrid>
            <IonCol>
                <IonRow>
                    <IonButton  onClick={Sair}>Encerrar sessão</IonButton>
                </IonRow>
            </IonCol>
        </IonGrid>
    </IonApp>
    )
}
export default Logout