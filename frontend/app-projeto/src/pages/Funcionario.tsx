import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonApp, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import axios from 'axios';
import StartFunc from '../components/Home-Func';

const Funcionario: React.FC = () => {

    return(
        <IonApp>
            <IonContent>
                <StartFunc />
            </IonContent>
        </IonApp>
    )
}

export default Funcionario