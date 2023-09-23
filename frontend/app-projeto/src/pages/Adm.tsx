import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonApp, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import axios from 'axios';
import StartAdm from '../components/Home-Adm';

const Adm: React.FC = () => {

    return(
        <IonApp>
            <StartAdm />
        </IonApp>
    )
}

export default Adm