import { IonIcon, IonLabel, IonTabBar, IonTabButton } from '@ionic/react';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {homeOutline, constructOutline, statsChartOutline, logOutOutline} from 'ionicons/icons'

const Tab: React.FC = () =>{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');
    const type = queryParams.get('type');
    const id = queryParams.get('id');
    const history = useHistory();


    const Sair = () => {
      history.push('/')
    }

    const RedirectObras = () => {
      if (type === '1'){
      history.push(`/adm/obras?username=${username}&type=${type}&id=${id}`)
    } else if (type === '2'){
      history.push(`/func/obras?username=${username}&type=${type}&id=${id}`)
    }
  } 
  
    const RedirectInsumos = () =>{
      if (type === '1'){
        history.push(`/adm/insumos?username=${username}&type=${type}&id=${id}`)
      } else if (type === '2'){
        history.push(`/func/insumos?username=${username}&type=${type}&id=${id}`)
      }
    }
  
    const RedirectHome = () => {
      if (type === '1'){
        history.push(`/adm?username=${username}&type=${type}&id=${id}`)
      } else if (type === '2'){
        history.push(`/func?username=${username}&type=${type}&id=${id}`)
      }
    }
  
    
    return(
      <IonTabBar slot='bottom'>
      <IonTabButton tab='Home' onClick={RedirectHome}>
          <IonIcon icon={homeOutline}></IonIcon>
          <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab='Obras' onClick={RedirectObras}>
          <IonIcon icon={constructOutline} />
          <IonLabel>Obras</IonLabel>
      </IonTabButton>
      <IonTabButton tab='Insumos' onClick={RedirectInsumos}>
          <IonIcon icon={statsChartOutline}></IonIcon>
          <IonLabel>Insumos</IonLabel>
      </IonTabButton>
      <IonTabButton tab='Sair' onClick={Sair}>
          <IonIcon icon={logOutOutline}></IonIcon>
          <IonLabel>Sair</IonLabel>
      </IonTabButton>
      </IonTabBar>
    )
      
}

export default Tab