import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonApp, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import axios from 'axios';
import Tab from '../components/Tab-componente';

const AdmObras: React.FC = () =>{

    return(
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Aqui está a situação das obras</IonTitle>
                </IonToolbar>
            </IonHeader>
            <Tab />
        </IonApp>
    )
}

export default AdmObras