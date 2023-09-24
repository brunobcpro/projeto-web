import React, { useEffect, useState } from "react";
import { IonAlert, IonButton, IonContent } from "@ionic/react";
import axios from "axios";

interface Pedidos {
    id: number,
    quantidade: number,
    obra: string,
    idPedido: number
  }

  const CompPedidos: React.FC<Pedidos> = () => {
  
    const [pedido, setPedidos] = useState<Pedidos[]>([]);
    const [pedidoAtendido, setPedidoAtendido] = useState<Pedidos | null>(null);
    const [alertAtendido, setAlertAtendido] = useState(false);
    const [alertFalha, setAlertFalha] = useState(false);
  
    useEffect(() => {
        const loadDados = async() => {
          try {

            const { data } = await axios.get("http://localhost:3000/admin/pedidos");
            setPedidos(data)

          } catch (error) {

            console.log('Erro em carregar pedidos', error);
          }
        }; 
        loadDados();
      }, []);

      const handlePedidos = async (idPedido: number) => {
        try {

            const response = await axios.delete(`http://localhost:3000/admin/fornecerInsumos/${idPedido}`);

            const updatedPedidos = pedido.filter((pedidos) => pedidos.idPedido !== idPedido);
            setPedidos(updatedPedidos);
            setPedidoAtendido(pedido.find((pedidos) => pedidos.idPedido === idPedido) || null);
            setAlertAtendido(true);




        } catch (error) {

            setAlertFalha(true)
            console.log('Falha em atender à demanda', error);
        }
      }
    
    
    return(
        <IonContent>
            <h2>Aqui estão os pedidos</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Quantidade</th>
                <th>Obra</th>
              </tr>
            </thead>
            <tbody>
              {pedido.map((pedido, index) => (
                <tr key={index}>
                  <td>{pedido.idPedido}</td>
                  <td>{pedido.quantidade}</td>
                  <td>{pedido.obra}</td>
                  <td>
                    <IonButton color="primary" onClick={() => handlePedidos(pedido.idPedido)}>Atender pedido</IonButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <IonAlert 
                isOpen={alertAtendido}
                onDidDismiss={() => setAlertAtendido(false)}
                header="Pedido atendido com sucesso" 
                message={`Pedido de id ${pedidoAtendido?.idPedido} atendido.`}
                buttons={["OK"]} />

        
        <IonAlert
                isOpen={alertFalha}
                onDidDismiss={() => setAlertFalha(false)}
                header="Falha em atender pedido"
                message="Verifique se há recurso suficiente e tente novamente"
                buttons={["OK"]} />
                
        </IonContent>
    )
  }

  export default CompPedidos