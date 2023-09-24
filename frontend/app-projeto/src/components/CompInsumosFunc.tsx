import React, { useEffect, useState } from "react";
import { IonApp, IonContent } from "@ionic/react";
import Tab from "./Tab-componente";
import axios from "axios";

interface Insumos {
  nome: string;
  unidade: string;
  estoque: number;
  id: number;
}

const CompInsumosFunc: React.FC<Insumos> = () => {
    const [insumo, setInsumo] = useState<Insumos[]>([]);
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const { data } = await axios.get("http://localhost:3000/admin/insumos");
          setInsumo(data);
        } catch (error) {
          console.log("Erro ao carregar insumos", error);
        }
      };
      loadData();
    }, []);
  
    return (
      <IonApp>
        <IonContent className="ion-text-center">
          <h2>Aqui está a situação dos insumos</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <table>
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Estoque</th>
                  <th>Unidades</th>
                </tr>
              </thead>
              <tbody>
                {insumo.map((rec, index) => (
                  <tr key={index}>
                    <td>{rec.nome}</td>
                    <td>{rec.estoque}</td>
                    <td>{rec.unidade}</td>
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

export default CompInsumosFunc