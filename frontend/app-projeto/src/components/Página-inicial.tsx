import { IonApp, IonContent, IonHeader, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Tab from './Tab-componente';
import Logout from './Logout';

const Start: React.FC = () => {
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
      <IonContent>
        <Logout />
      </IonContent>
      <Tab />
    </IonApp>
    
  );
};

export default Start;
