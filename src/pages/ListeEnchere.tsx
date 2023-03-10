import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { eye, image } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import './ListeEnchere.css';

function redirect(page: string) {
  window.location.href = page;
}

const token = localStorage.getItem('token');
var iduser = 0;
export const ListeEnchere: React.FC = () => {

  const [user, setUser ] = useState<any>();
  const [posts, setPosts ] = useState([]);
  const [message, setMessage] = useState('Attente de résultats...');
  const [message2, setMessage2] = useState('');

  useEffect(() =>{
    if (token) {
      const tokenuser = JSON.parse(token);
      setUser(tokenuser.utilisateur);
      iduser = tokenuser.utilisateur.id;
    }

    fetch('https://encherews-production.up.railway.app/Enchere/encheres/idutilisateur/' + iduser, {
        method: "GET",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
            setPosts(data);  
            setMessage("");     
            if (posts.length == 0) setMessage("Vous n'avez pas encore créé une enchère.");     
            return jsonPromise;
          }).catch(error => {
            console.log("Successful request, Could not parse body as json", error);
          })
        }
        else throw new Error('Une erreur s\'est produite');
      })           
       .catch((err) => {
          console.log(err);   
       });
  }, [posts]);
    
  return (
    <IonPage>
      <IonHeader  >
        <IonToolbar >
          <IonTitle  class='head'>Liste des encheres de {user?.nom} {user?.prenom}</IonTitle>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
    
        {posts?.map((post: any) => 
          <IonCard>
            <img src={`${post.photo_couverture}`} width="100%"/>
            <IonCardHeader>
                <IonCardTitle>{post.intitule}</IonCardTitle>
                <IonCardSubtitle>{post.categorie.libelle}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonList>
                <IonItem class="item">Date de publication de l'enchere: {post.date}</IonItem>
                <IonItem class="item">Date fin : {post.date_fin} </IonItem>
                <IonItem class="item">Prix: {post.prix_mise_enchere} Ar</IonItem>
                <IonItem class="item">Statut: {post.statut}</IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        )} 
          <p>{message}</p>
        {posts.length === 0 &&
          <p>{message2}</p>
        }
      </IonContent>
    </IonPage>
  );
};

export default ListeEnchere;