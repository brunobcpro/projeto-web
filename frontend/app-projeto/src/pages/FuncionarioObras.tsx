import React from 'react';
import { IonContent, IonApp } from '@ionic/react';
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