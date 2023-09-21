import { IonAlert, IonApp, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Tab from './Tab-componente';
import axios from 'axios'; 
import Logout from './Logout';

const Start: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  const id = queryParams.get('id');
  const type = queryParams.get('type');

  const [nomeAdm, setNomeAdm] = useState('');
  const [loginAdm, setLoginAdm] = useState('');
  const [senhaAdm, setSenhaAdm] = useState('');

  const [nomeFunc, setNomeFunc] = useState('');
  const [loginFunc, setLoginFunc] = useState('');
  const [senhaFunc, setSenhaFunc] = useState('');
  const [salario, setSalario] = useState('');
  const [cargo, setCargo] = useState('');
  const [idObra, setIdObra] = useState('');
  const [registroAlert, setRegistroAlert] = useState(false);

  const handleRegistroAdm = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin/novoAdm', { nome: nomeAdm, login: loginAdm, senha: senhaAdm });
      if (response.status === 200) {
        console.log('Registro de administrador bem sucedido');

        setNomeAdm('');
        setLoginAdm('');
        setSenhaAdm('');
      } else {
        console.log('Falha em registrar o administrador');
      }
  
      console.log('Resposta do servidor:', response.data);
      setRegistroAlert(true);
      return response;
    } catch (error) {
      console.error('Erro ao registrar administrador:', error);
    }
  };

  const handleRegistroFunc = async () => {
    try {
      const resposta = await axios.post('http://localhost:3000/admin/novoFuncionario', {
        nome: nomeFunc,
        login: loginFunc,
        senha: senhaFunc,
        salario,
        cargo,
        idObra
      });

      if (resposta.status === 200) {
        console.log('Funcionário registrado com sucesso');

        setNomeFunc('');
        setLoginFunc('');
        setSenhaFunc('');
        setSalario('');
        setCargo('');
        setIdObra('');
      } else {
        console.log('Falha em registrar o funcionário:', resposta.data);
      }
      
      console.log('Resposta do servidor:', resposta.data);
    } catch (error) {
      console.error('Erro ao registrar funcionário:', error);
    }
  }
  
  const redirectExlcuir = () => {
    history.push(`/adm/excluir?username=${username}&type=${type}&id=${id}`)
  }
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='ion-text-center'>Bem vindo {username}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput type='text' placeholder='Nome do adm' value={nomeAdm} onIonChange={(e) => setNomeAdm(e.detail.value!)} />
        <IonInput type='text' placeholder='Login do adm' value={loginAdm} onIonChange={(e) => setLoginAdm(e.detail.value!)} />
        <IonInput type='text' placeholder='Senha do adm' value={senhaAdm} onIonChange={(e) => setSenhaAdm(e.detail.value!)} />
        <IonButton onClick={handleRegistroAdm}>Registrar Administrador</IonButton>

        <IonInput type='text' placeholder='Nome do funcionário' value={nomeFunc} onIonChange={(e) => setNomeFunc(e.detail.value!)}></IonInput>
        <IonInput type='text' placeholder='Login do funcionário' value={loginFunc} onIonChange={(e) => setLoginFunc(e.detail.value!)}></IonInput>
        <IonInput type='text' placeholder='Senha do funcionário' value={senhaFunc} onIonChange={(e) => setSenhaFunc(e.detail.value!)}></IonInput>
        <IonInput type='text' placeholder='Cargo do funcionário' value={cargo} onIonChange={(e) => setCargo(e.detail.value!)}/>
        <IonInput type='text' placeholder='Salário do funcionário' value={salario} onIonChange={(e) => setSalario(e.detail.value!)}></IonInput>
        <IonInput type='text' placeholder='Id da obra do funcionário' value={idObra} onIonChange={(e) => setIdObra(e.detail.value!)}></IonInput>
        <IonGrid>
          <IonCol>
            <IonRow>
              <IonButton onClick={handleRegistroFunc}>Registrar funcionário</IonButton>
              <IonButton onClick={redirectExlcuir}>Excluir usuários</IonButton>
              <Logout />
            </IonRow>
          </IonCol>
        </IonGrid>
      </IonContent>
      <Tab />
      <IonAlert 
      isOpen={registroAlert}
      onDidDismiss={() => {setRegistroAlert(false)}}
      header='Usuário registrado com sucesso.'
      message='Clique em OK para fechar o aviso'
      buttons={['OK']}
      />
    </IonApp>
  );
};

export default Start;
