import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonApp, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonAlert } from '@ionic/react';
import './Home.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 

//Função de redirecionamento de página
const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory(); 

  useEffect(() => {
    async function Login() {
      try {
        const response = await axios.get('http://localhost:3000/users');
        const usuarios = response.data;

        const user = usuarios.find((usuario: { nome: string, senha: string }) => usuario.nome === username && usuario.senha === password);

        if (user) {
          setAuthenticated(true);
          setType(user.tipo)
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
      }
    }

    Login(); 

  }, [username, password, history]); 

  //Evento para o botão login
  const handleLoginClick = () => {
    
    if (authenticated) {
      if (type === '1'){
        history.push('/adm');
      }else if(type === '2'){
        history.push('/func');
      }
    }else{
      setShowAlert(true);
    }
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='ion-text-center'>Bem vindo à FAMAS. Coloque suas credenciais para entrar em sua respectiva rota.</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Login</IonLabel>
                <IonInput type='text' value={username} onIonChange={(e) => setUsername(e.detail.value!)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Senha</IonLabel>
                <IonInput type='password' value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={handleLoginClick}>Logar</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Credenciais inválidas"
          message="Por favor, verifique seu login e senha e tente novamente."
          buttons={['OK']}
        />
    </IonApp>
  );
};

export default Home;
