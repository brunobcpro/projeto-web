import { IonAlert, IonApp, IonButton, IonInput, IonLabel } from "@ionic/react";
import React, { useState } from "react";
import Tab from "../components/Tab-componente";
import axios from "axios";
import CompInsumosFunc from "../components/CompInsumosFunc";

const FuncionarioInsumos: React.FC = () => {

const [id, setId] = useState('');
const [quantidade, setQuantidade] = useState('');
const [obra, setObra] = useState('');
const [alertPedido, setAlertPedido] = useState(false)


const handleSolicitação = async () => {
    
        try {
            const response = await axios.post(`http://localhost:3000/funcionario/solicitar/${id}/${quantidade}/${obra}`)
            
            if (response.status === 200){

                console.log('Solicitação concluída com êxito');
                setId('');
                setObra('');
                setQuantidade('');
                setAlertPedido(true);

            } else {

                console.log('Falha em enviar pedido');
            } 

        } catch (error){

            console.log(error);
        }
    } 


    return(
        <IonApp>
                <CompInsumosFunc nome={""} unidade={""} estoque={0} id={0}/>
                <IonLabel>Deseja solicitar algum recurso? Preencha abaixo o que desejas.</IonLabel>
                <IonInput type="text" placeholder="Id do insumo desejado" value={id} onIonChange={(e) => setId(e.detail.value!)}></IonInput>
                <IonInput type="text" placeholder="Quantidade desejada" value={quantidade} onIonChange={(e) => setQuantidade(e.detail.value!)}></IonInput>
                <IonInput type="text" placeholder="Id da obra solicitadora" value={obra} onIonChange={(e) => setObra(e.detail.value!)}></IonInput>
                <IonButton onClick={handleSolicitação}>Solicitar</IonButton>
                <IonAlert 
                        isOpen={alertPedido}
                        onDidDismiss={() => setAlertPedido(false)}
                        header="Pedido enviado com sucesso"
                        message="Aguarde uma resposta dos administradores"
                        buttons={["OK"]} />
                
                <Tab />
        </IonApp>
    )
}

export default FuncionarioInsumos