import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Adm from './pages/Adm';
import Funcionario from './pages/Funcionario';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import FuncionarioObras from './pages/FuncionarioObras';
import AdmObras from './pages/AdmObras';
import AdmInsumos from './pages/AdmInsumos';
import FuncionarioInsumos from './pages/FuncionarioInsumos';
import ChangePass from './pages/MudarSenha';
import Excluir from './pages/Excluir';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/adm">
          <Adm/>
        </Route>
        <Route exact path="/adm/obras">
          <AdmObras/>
        </Route>
        <Route exact path="/adm/insumos">
          <AdmInsumos />
        </Route>
        <Route exact path="/func">
          <Funcionario/>
        </Route>
        <Route exact path="/func/obras">
          <FuncionarioObras />
        </Route>
        <Route exact path="/func/insumos">
          <FuncionarioInsumos/>
        </Route>
        <Route exact path="/alterar">
          <ChangePass />
        </Route>
        <Route exact path="/adm/excluir">
        <Excluir />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
