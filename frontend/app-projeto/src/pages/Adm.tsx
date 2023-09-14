import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonApp, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import axios from 'axios';

const Adm: React.FC = () => {

    return(
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                    Bem vindo ADM.
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonApp>
    )
}

export default Adm