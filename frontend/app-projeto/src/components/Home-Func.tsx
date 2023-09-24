import { IonApp, IonContent } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Tab from "./Tab-componente";

interface informações {
  id: number;
  nome: string;
  cargo: string;
  salario: string;
  idObra: number;
}

const StartFunc: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id"); 

  const [info, setInfo] = useState<informações[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(`http://localhost:3000/funcionario/informacoesPessoais/${id}`);
        console.log([response.data]);
        setInfo([response.data]);
      } 
        
        catch (error) {
        console.error("Error fetching data:", error);
      }
    }

      loadData();
    
  }, [id]); 

  return (
    <IonApp>
      <IonContent>
        <div style={{display: 'flex', justifyContent: 'center'}}>  
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Salário</th>
                <th>ID Obra</th>
              </tr>
            </thead>
            <tbody>
              {info.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.cargo}</td>
                  <td>{item.salario}</td>
                  <td>{item.idObra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </IonContent>
      <Tab />
    </IonApp>
  );
};

export default StartFunc;
