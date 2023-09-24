import React, { useState, useEffect } from 'react';
import { IonAlert, IonButton, IonContent, IonApp } from '@ionic/react';
import Tab from "./Tab-componente";
import axios from 'axios';

interface Usuario {
    id: number;
    nome: string;
    senha: string;
    tipo: string;
  }
  
  const CompExcluir: React.FC = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [exclusaoAlert, setExclusaoAlert] = useState(false);
    const [usuarioExcluido, setUsuarioExcluido] = useState<Usuario | null>(null);
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const { data } = await axios.get("http://localhost:3000/users");
          setUsuarios(data);
        } catch (error) {
          console.log("Erro ao carregar usuários", error);
        }
      };
      loadData();
    }, []);
  
    const handleExcluirUsuario = async (id: number) => {
        try {
          await axios.delete(`http://localhost:3000/admin/excluirUsuario/${id}`)

          const updatedUsuarios = usuarios.filter((usuario) => usuario.id !== id);
          setUsuarios(updatedUsuarios);
          setUsuarioExcluido(usuarios.find((usuario) => usuario.id === id) || null);
          setExclusaoAlert(true);
        } catch (error) {
          console.error('Erro ao excluir usuário:', error);
        }
      };
    
      return (
        <IonApp>
          <IonContent className="ion-text-center">
            <h2>Aqui estão as informações dos usuários</h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Senha</th>
                    <th>Tipo</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.nome}</td>
                      <td>{usuario.senha}</td>
                      <td>{usuario.tipo}</td>
                      <td>
                        <IonButton color="danger" onClick={() => handleExcluirUsuario(usuario.id)}>
                          Excluir
                        </IonButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </IonContent>
          <Tab />
          <IonAlert
            isOpen={exclusaoAlert}
            onDidDismiss={() => {
              setExclusaoAlert(false);
            }}
            header="Usuário excluído com sucesso"
            message={`ID: ${usuarioExcluido?.id}, Nome: ${usuarioExcluido?.nome}, Tipo: ${usuarioExcluido?.tipo}`}
            buttons={["OK"]}
          />
        </IonApp>
      );
    };  
  
  export default CompExcluir