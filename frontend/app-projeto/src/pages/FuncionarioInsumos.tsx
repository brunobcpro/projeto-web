import { IonApp, IonButton, IonContent, IonHeader, IonInput, IonLabel, IonTitle, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import Tab from "../components/Tab-componente";
import CompInsumos from "../components/CompInsumos";
import axios from "axios";
import { error } from "console";

const FuncionarioInsumos: React.FC = () => {

const [id, setId] = useState('');
const [quantidade, setQuantidade] = useState('');
const [idPedido, setIdPedido] = useState('');
const [obra, setObra] = useState('');

const handleSolicitação = () => {
    const loadData = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/admin/pedidos`, {id, quantidade, idPedido, obra})
            
            .then(await axios.delete(`http://localhost:3000/admin/forneceInsumos/${id}`));

            if (response.status === 200){

                console.log('Pedido recebido');
                setId('');
                setIdPedido('');
                setObra('');
                setQuantidade('');

            } else {

                console.log('Falha em receber pedido');
            } 

        } catch (error){

            console.log(error);
        }
    }
}

    return(
        <IonApp>
                <CompInsumos nome={""} unidade={""} estoque={0} id={0}/>
                <IonLabel>Deseja solicitar algum recurso? Preencha abaixo o que desejas.</IonLabel>
                <IonInput type="text" placeholder="Id do insumo desejado" value={id} onIonChange={(e) => setId(e.detail.value!)}></IonInput>
                <IonInput type="text" placeholder="Quantidade desejada" value={quantidade} onIonChange={(e) => setQuantidade(e.detail.value!)}></IonInput>
                <IonButton onClick={handleSolicitação}>Solicitar</IonButton>
                
                <Tab />
        </IonApp>
    )
}

export default FuncionarioInsumos