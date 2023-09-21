import { IonApp, IonContent, IonHeader, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

interface Obras {
  obra: string;
  funcionarios: number;
  id: number;
  andamentoObra: {
    etapa: number;
    evento: string;
    estimativaConclusao: number;
    tempoConclusao: number | string;
  }[];
}

const CompObras: React.FC<Obras> = () => {
  const [obra, setObra] = useState<Obras[]>([]);
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [obraSelecionada, setObraSelecionada] = useState<number | undefined>(undefined);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const tipo = queryParams.get('type');

  useEffect(() => {
    const loadData = async () => {
      try {
        let urlObras = "http://localhost:3000/admin/obras"
        const urlFuncionarios = "http://localhost:3000/admin/funcionarios"

        if (tipo === "2") {
          urlObras = `http://localhost:3000/admin/obras/${id}`
        }

        const [obrasResponse, funcionariosResponse] = await Promise.all([
          axios.get(urlObras),
          axios.get(urlFuncionarios) 
        ]);

        if (Array.isArray(obrasResponse.data)) {
          setObra(obrasResponse.data);
        } else {
          setObra([obrasResponse.data]);
        }

        setFuncionarios(funcionariosResponse.data);

      } catch (error) {
        console.log("Falha ao carregar obras ou funcionários");
      }
    };
    loadData();
  }, [id, tipo]);

  const selecionarObra = (index: number | undefined) => {
    setObraSelecionada(index);
  };

  const obterFuncionariosPorObra = (idObra: number) => {
    const obraSelecionada = obra.find((obra) => obra.id === idObra);
    return obraSelecionada ? funcionarios.filter((funcionario) => funcionario.idObra === idObra) : [];
  };


  return (
    <IonApp>
      <IonContent>
        <IonSegment value={obraSelecionada}>
          {obra.map((construcao, index) => (
            <IonSegmentButton key={index} value={index} onClick={() => selecionarObra(index)}>
              <IonLabel>{construcao.obra}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        {obraSelecionada !== undefined && (
          <div>
            <h2>Detalhes da Obra</h2>
            <p>Obra: {obra[obraSelecionada].obra}</p>
            <p>Quantidade de Funcionários: {obterFuncionariosPorObra(obra[obraSelecionada].id).length}</p>

            <h3>Funcionários na Obra:</h3>
            <ul>
              {obterFuncionariosPorObra(obra[obraSelecionada].id).map(funcionario => (
                <li key={funcionario.id}>
                  Nome: {funcionario.nome} (Cargo: {funcionario.cargo}, Salário: {funcionario.salario})
                </li>
              ))}
            </ul>

            <h3>Andamento da Obra</h3>
            <ul>
              {obra[obraSelecionada].andamentoObra.map((etapa, index) => (
                <li key={index}>
                  Etapa: {etapa.etapa}
                  <br />
                  Evento: {etapa.evento}
                  <br />
                  Estimativa de Conclusão: {etapa.estimativaConclusao} dias
                  <br />
                  Tempo de Conclusão: {etapa.tempoConclusao === "" || etapa.tempoConclusao === 0 ? "Em andamento" : `${etapa.tempoConclusao} dias`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </IonContent>
    </IonApp>
  );
};

export default CompObras;