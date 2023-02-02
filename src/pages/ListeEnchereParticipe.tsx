import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { eye, image } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import './ListeEnchereParticipe.css';

function redirect(page: string) {
  window.location.href = page;
}

const token = localStorage.getItem('token');
var iduser = 0;
export const ListeEnchereParticipe: React.FC = () => {
  const [user, setUser ] = useState<any>();
  const [posts, setPosts ] = useState([]);

  useEffect(() =>{
    if (token) {
      const tokenuser = JSON.parse(token);
      setUser(tokenuser.utilisateur);
      iduser = tokenuser.utilisateur.id;
    }

    fetch('http://localhost:8080/Enchere/encheres/historique/utilisateur/' + iduser, {
        method: "GET",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
            setPosts(data);       
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
  }, []);
    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des encheres participées de {user?.nom} {user?.prenom}</IonTitle>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
    
        {posts?.map((post: any) => 
          <IonCard>
            <img src={`${post.enchere.photo_couverture}`} width="100%"/>
            <IonCardHeader>
                <IonCardTitle>{post.enchere.intitule}</IonCardTitle>
                <IonCardSubtitle>{post.enchere.categorie.libelle}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonList>
                <IonItem class="item">Date de publication de l'enchere: {post.enchere.date}</IonItem>
                <IonItem class="item">Date fin : {post.enchere.date_fin} </IonItem>
                <IonItem class="item">Prix misé: {post.prix} Ar</IonItem>
                <IonItem class="item">Statut: {post.enchere.statut}</IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        )} 
          
      </IonContent>
    </IonPage>
  );
};

export default ListeEnchereParticipe;