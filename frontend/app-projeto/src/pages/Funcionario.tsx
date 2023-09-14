import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonApp, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import axios from 'axios';

const Funcionario: React.FC = () => {

    return(
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                    Bem vindo Funcionario.
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonApp>
    )
}

export default Funcionario