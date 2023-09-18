import { IonApp, IonHeader, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import {homeOutline, constructOutline, statsChartOutline} from 'ionicons/icons'
import Tab from './Tab-componente';

const Obras: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='ion-text-center'>
            Bem vindo {username}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <Tab />
    </IonApp>
    
  );
};

export default Obras;
