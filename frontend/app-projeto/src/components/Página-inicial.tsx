import { IonApp, IonHeader, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import {homeOutline, cashOutline, buildOutline} from 'ionicons/icons'

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
      <IonTabBar slot='bottom'>
      <IonTabButton tab='Home' >
        <IonIcon icon={homeOutline}></IonIcon>
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab='Obras'>
  <IonIcon icon={buildOutline} />
  <IonLabel>Obras</IonLabel>
</IonTabButton>


    </IonTabBar>
    </IonApp>
    
  );
};

export default Start;
