import { IonAlert, IonApp, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const ChangePass: React.FC = () =>{

    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();

    const voltar = () =>{
        history.push('/')
    }

    useEffect(() => {
        async function Login() {
          try {
            const response = await axios.get('http://localhost:3000/users');
            const usuarios = response.data;
    
            const user = usuarios.find((usuario: { nome: string, senha: string }) => usuario.nome === username && usuario.senha === oldPassword);
    
            if (user) {
              setAuthenticated(true);
            } else {
              setAuthenticated(false);
            }
          } catch (error) {
            console.error('Erro ao fazer a solicitação:', error);
          }
        }
    
        Login(); 
    
      }, [username, oldPassword, history]);

      const MudarSenha = async () => {
  if (authenticated) {
    try {
   
      const response = await axios.put(`http://localhost:3000/users`, {
      });
      
      if (response.status === 200) {
        history.push('/login');
      }
    } catch (error) {
      console.error('Erro ao alterar a senha:', error);
    }
  } else {
    setShowAlert(true);
  }
};

    return(
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="ion-text-center">Para alterar a senha, preencha os campos a seguir.</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Nome do usuário</IonLabel>
                                    <IonInput type="text" value={username} onIonChange={(e) => setUsername(e.detail.value!)}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Senha antiga</IonLabel>
                                    <IonInput type="password" value={oldPassword} onIonChange={(e) => setOldPassword(e.detail.value!)}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Senha nova</IonLabel>
                                    <IonInput type="password" value={newPassword} onIonChange={(e) => setNewPassword(e.detail.value!)}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton style={{margin:'10px'}} onClick={MudarSenha}>Mudar senha</IonButton>
                                <IonButton onClick={voltar} style={{margin:'10px'}}>Voltar à tela inicial</IonButton>
                            </IonCol>
                        </IonRow>
                </IonGrid>
            </IonContent>
            <IonAlert 
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Nome ou senha inicial incorretos"
            message={"Verifique novamente se os dados estão certos."}
            buttons={["OK"]}>
            </IonAlert>
        </IonApp>
    )
}

export default ChangePass