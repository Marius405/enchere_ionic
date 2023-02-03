import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonNavLink, IonNote, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import './RecharcheCompte.css';

const token = localStorage.getItem('token');

const RechargeCompte: React.FC = () => {
  /*if (token) {
    const tokenuser = JSON.parse(token);
    iduser = tokenuser.utilisateur.id;
  }*/
  const [montant,setMontant]=useState('0');
  const [message, setMessage] = useState<String>();

  const [user, setUser] = useState<any>();

  useEffect(() =>{
    if (token) {
      const tokenuser = JSON.parse(token);
      setUser(tokenuser.utilisateur);
    }
  }, []);

  async function handleSubmit() {
    const demandeJSON = {
      montant:montant,
      utilisateur: { id: user.id},
    };
    console.log(JSON.stringify(demandeJSON))
    fetch('https://encherews-production.up.railway.app/Enchere/demande_rechargements', {
        method: "POST",
        body: JSON.stringify(demandeJSON),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
            setMessage("Demandé avec succès!");
            return jsonPromise;
          }).catch(error => {
            setMessage("Demandé avec succès!");
            console.log("Successful request, Could not parse body as json", error);
          })
        }
        else throw new Error('Une erreur s\'est produite!');
      })
       .catch((err) => {
          setMessage(err.message);
          console.log(err);   
       });
  };

  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle class='tete' size="large">Demande</IonTitle>

            <IonButtons slot="end">
              <NavButtons/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonCard>
        <IonCardHeader>
            <IonCardTitle class='head'>Recharement du compte</IonCardTitle>
            <IonCardSubtitle>Recharger le montant de votre compte</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem>
              <IonLabel position="floating">Montant</IonLabel>
              <IonInput type="text" name="montant" id="montant" value={montant} onIonChange={(e) => setMontant(e.detail.value!)}></IonInput>
              <IonNote slot="helper" >entrer le montant a ajouter</IonNote>
              <IonNote slot="error">montant invalide</IonNote>
          </IonItem>
          <IonNavLink className='navlink'><a href='/listeenchere' >Retour</a></IonNavLink>
          <IonButton onClick={handleSubmit} shape='round' expand='block' className='ion-margin-top' color="success">
              Demander
          </IonButton>
          <p color='green' id='message'> {message} </p>
        </IonCardContent>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RechargeCompte;
