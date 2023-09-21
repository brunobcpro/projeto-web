import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonApp, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton,IonPage } from '@ionic/react';
import axios from 'axios';
import Tab from '../components/Tab-componente';
import CompExcluir from '../components/CompExcluir';

const Excluir: React.FC = () => {
    return (
    <IonApp>
        <IonContent>
        <CompExcluir   />
        </IonContent>
      </IonApp>
      
      
    );
  };
  
  export default Excluir;