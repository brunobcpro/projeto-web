import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonApp, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import axios from 'axios';
import Tab from '../components/Tab-componente';
import CompObras from '../components/CompObras';

const FuncionarioObras: React.FC = () =>{
    return(
        <IonApp>
            <IonContent>
                <CompObras obra={''} funcionarios={0} id={0} andamentoObra={[]} />
            </IonContent>
            <Tab />
        </IonApp>
        )
}
export default FuncionarioObras