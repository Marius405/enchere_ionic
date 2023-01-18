import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonNavLink, IonNote, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Inscription.css';

const Inscription: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [nom,setNom] = useState('');
  const[prenom,setPrenom]=useState('');
  const[dtn,setDtn]=useState('');
  const[cin,setCin]=useState('');
  const [message, setMessage] = useState();

  async function handleSubmit() {
    const data = {
      nom : nom,
      prenom : prenom,
      date_naissance : dtn,
      email: email,
      mdp: mdp,
      cin : cin,
    };
    console.log(JSON.stringify(data))
    fetch('http://localhost:8080/Enchere/utilisateurs', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
      })
       .then(function(response) {
          if(response.ok) {
            window.location.href = "/";
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
       .then((result) => {
          console.log("result : " + result);
        })
        .catch((err) => {
          setMessage(err.message);
          console.log(err);   
        });
      };
      
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inscription</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
        <IonCardHeader>
            <IonCardTitle>Inscription</IonCardTitle>
            <IonCardSubtitle>Creer votre compte.</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
                <IonItem>
                    <IonLabel position="floating">Nom</IonLabel>
                    <IonInput type="text" name="nom" id="nom" value={nom} onIonChange={(e) => setNom(e.detail.value!)}></IonInput>
                    <IonNote slot="helper" >Entrer votre nom</IonNote>
                    <IonNote slot="error">nom invalide</IonNote>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Prenom</IonLabel>
                    <IonInput type="text" name="prenom" id="prenom" value={prenom} onIonChange={(e) => setPrenom(e.detail.value!)}></IonInput>
                    <IonNote slot="helper">Entrer votre prenom</IonNote>
                    <IonNote slot="error">prenom invalide</IonNote>
                </IonItem>
                <IonItem>
                    <IonLabel>Date de naissance</IonLabel>
                    <IonInput type="date" name="dtn" id="dtn" value={dtn} onIonChange={(e) => setDtn(e.detail.value!)}></IonInput>
                    <IonNote slot="helper">Entrer la date de naissance</IonNote>
                    <IonNote slot="error">date invalide</IonNote>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Numero CIN</IonLabel>
                    <IonInput type="text" name="cin" id="cin" value={cin} onIonChange={(e) => setCin(e.detail.value!)}></IonInput>
                    <IonNote slot="helper">Votre numero de CIN</IonNote>
                    <IonNote slot="error">num CIN invalide</IonNote>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput type="email" name="email" id="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                    <IonNote slot="helper" >Entrer l'adresse mail</IonNote>
                    <IonNote slot="error">Email invalide</IonNote>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Mot de passe</IonLabel>
                    <IonInput type="password" name="mdp" id="mdp" value={mdp} onIonChange={(e) => setMdp(e.detail.value!)}></IonInput>
                    <IonNote slot="helper">Entrer le mot de passe</IonNote>
                    <IonNote slot="error">Mot de passe invalide</IonNote>
                </IonItem>
                <IonButton onClick={handleSubmit} expand='block' className='ion-margin-top' color="success">
                    Creer compte
                </IonButton>
                <p color='red'>{message}</p>
        </IonCardContent>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Inscription;