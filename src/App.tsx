import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import Login from './pages/Login';
import Inscription from './pages/Inscription';
import RechargeCompte from './pages/RechargeCompte';
import ListeEnchere from './pages/ListeEnchere';
import Insertion_enchere from './pages/Insertion_Enchere';
import { Menu } from './components/Menu';
import ListeEnchereParticipe from './pages/ListeEnchereParticipe';

/* Theme variables */

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Menu/>
      <IonRouterOutlet id="main">
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/inscription">
          <Inscription />
        </Route>
        <Route exact path="/rechargecompte">
          <RechargeCompte />
        </Route>
        <Route exact path="/listeenchere">
          <ListeEnchere />
        </Route>
        <Route exact path="/enchereparticipe">
          <ListeEnchereParticipe />
        </Route>
        <Route exact path="/insertionenchere">
          <Insertion_enchere />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
