import React from 'react';
import { IonContent, IonApp } from '@ionic/react';
import StartFunc from '../components/Home-Func';

const Funcionario: React.FC = () => {

    return(
        <IonApp>
            <IonContent>
                <StartFunc />
            </IonContent>
        </IonApp>
    )
}

export default Funcionario