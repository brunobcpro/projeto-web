import React, { useEffect, useState } from 'react';
import { IonContent, IonApp, IonTitle, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonAlert } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; 

//Função de redirecionamento de página
const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(null);
  const [id, setId] = useState(null);
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
          setId(user.id)
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
      if (type === '1') {
        history.push(`/adm?username=${username}&type=${type}&id=${id}`); 
      } else if (type === '2') {
        history.push(`/func?username=${username}&type=${type}&id=${id}`); 
      }
    } else {
      setShowAlert(true);
      setPassword('');
      setUsername('');
    }
  };
  
  return (
    <IonApp>
     <IonContent className="ion-padding" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
  <IonGrid style={{ maxWidth: '400px', width: '80%' }}>
    <IonRow className="ion-align-items-center">
      <IonCol>
      <img src="/assets/icon/icon.png" alt="icon.png" style={{ maxWidth: '100%', marginBottom: '20px' }} />
        <IonTitle>Bem vindo à FAMA.</IonTitle>
        <IonLabel>Coloque suas credenciais para entrar em sua respectiva rota.</IonLabel>
      </IonCol>
    </IonRow>
    <IonRow className="ion-align-items-center">
      <IonCol>
        <IonItem>
          <IonLabel position="floating">Login</IonLabel>
          <IonInput type='text' value={username} onIonChange={(e) => setUsername(e.detail.value!)}></IonInput>
        </IonItem>
      </IonCol>
    </IonRow>
    <IonRow className="ion-align-items-center">
      <IonCol>
        <IonItem>
          <IonLabel position="floating">Senha</IonLabel>
          <IonInput type='password' value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
        </IonItem>
      </IonCol>
    </IonRow>
    <IonRow className="ion-align-items-center">
      <IonCol className="ion-text-center">
        <IonButton onClick={handleLoginClick}>Logar</IonButton>
      </IonCol>
    </IonRow>
    <IonRow className="ion-align-items-center">
      <IonCol className="ion-text-center">
        <IonLabel>Deseja alterar sua senha? <a href='/alterar'>Clique aqui</a>.</IonLabel>
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
