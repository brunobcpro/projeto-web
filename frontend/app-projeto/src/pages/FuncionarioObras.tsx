import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonApp, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import axios from 'axios';
import Tab from '../components/Tab-componente';

const FuncionarioObras: React.FC = () =>{
    return(
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className='ion-text-center'>
                        Aqui está a situação da sua obra:
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <Tab />
        </IonApp>
        )
}
export default FuncionarioObras