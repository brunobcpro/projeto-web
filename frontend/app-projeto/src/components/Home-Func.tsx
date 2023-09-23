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
  const id = queryParams.get("id"); // Assuming you're using 'id' from the query parameters.

  const [info, setInfo] = useState<informações[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(`http://localhost:3000/funcionario/informacoesPessoais/${id}`);
        if(Array.isArray(response.data)){
        setInfo(response.data);
        console.log(response.data);
        }
        else{
        setInfo([response.data]);
        console.log([response.data])}
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

      loadData();
    
  }, [id]); // Make sure to include 'id' as a dependency so that loadData is called when 'id' changes.

  return (
    <IonApp>
      <IonContent>
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
      </IonContent>
      <Tab />
    </IonApp>
  );
};

export default StartFunc;
