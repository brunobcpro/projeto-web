import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonApp, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import axios from 'axios';
import Start from '../components/Página-inicial';

const Adm: React.FC = () => {

    return(
        <IonApp>
            <Start />
        </IonApp>
    )
}

export default Adm