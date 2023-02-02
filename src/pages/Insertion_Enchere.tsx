import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonNavLink, IonNote, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import './Insertion_Enchere.css';

const token = localStorage.getItem('token');
const Insertion_enchere: React.FC = () => {
  const [message, setMessage] = useState<String>();
  const[categories,setCategories] = useState([]);
  const [user, setUser ] = useState<any>();

  const [intitule, setIntitule] = useState('');
  const [descrition, setDescription] = useState('');
  const [prix_mise_enchere, setPrix_mise_enchere] = useState('');
  const [photo_couverture, setPhoto_couverture ] = useState('');
  const [date, setDate] = useState('');
  const [date_fin, setDate_fin] = useState('');
  const [categorieid, setCategorieid] = useState('');

  const enchere_photosJSON: any[] = [];
  const [photos, setPhotos] = useState<string[]>();

  const currentTimestamp = new Date().toISOString();
  
  const dateFinChanged = (value: any) => {
    let formattedDate = value;
    console.log("date fin: " + formattedDate);
    setDate_fin(formattedDate);
  };

  const handlePhoto_couverture = async (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhoto_couverture(reader.result as string);
    };
  };

  const handlePhotos = async (event: any) => {
    const file = event.target.files;
    const gmi:string[] = [];
    for (let i = 0; i < file.length; i++) {      
      const reader = new FileReader();
      reader.readAsDataURL(file[i]);
      reader.onload = () => {
        const uri = reader.result as string;
        gmi[i] = uri;
      };
    }
    setPhotos(gmi);
  };

  useEffect(() =>{
    if (token) {
      const tokenuser = JSON.parse(token);
      setUser(tokenuser.utilisateur);
    }
    console.log("now : " + currentTimestamp);
    setDate(currentTimestamp);

    fetch('http://localhost:8080/Enchere/categories', {
        method: "GET",
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
            setCategories(data);       
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

  async function handleSubmit() {
    const enchereJSON = {
      intitule: intitule,
      prix_mise_enchere: prix_mise_enchere,
      categorie: {id:categorieid},
      utilisateur: {id: user.id},
      description: descrition,
      date : date,
      date_fin : date_fin,
      photo_couverture : photo_couverture,
    };
    console.log(JSON.stringify(enchereJSON));
    var id = "0";
    fetch('http://localhost:8080/Enchere/encheres', {
        method: "POST",
        body: JSON.stringify(enchereJSON),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
      })
       .then(function(response) {
        if(response.ok) {
          const jsonPromise = response.json();
          jsonPromise.then(data => {
            console.log("Successful request, parsed json body", data);
            id = JSON.stringify(data); 
            addPhotos();            
            setMessage("");
            return jsonPromise;
          }).catch(error => {
            setMessage(error.message);
            console.log("Successful request, Could not parse body as json", error);
          })
        }
        else throw new Error('Une erreur s\'est produite!');
      })
       .catch((err) => {
          setMessage(err.message);
          console.log(err);   
       });

    function addPhotos() {
      if (photos) {
        for (let i = 0; i < photos.length; i++) {
          enchere_photosJSON.push({
            idenchere: id,
            photo: photos[i],
          });     
        }
      }

      fetch('http://localhost:8080/Enchere/encheres/photos', {
          method: "POST",
          body: JSON.stringify(enchere_photosJSON),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then(function(response) {
          if(response.ok) {
            const jsonPromise = response.json();
            jsonPromise.then(data => {
              console.log("Successful request, parsed json body", data);
              setMessage("");
              return jsonPromise;
            }).catch(error => {
              console.log("Successful request, Could not parse body as json", error);
            })
          }
          else throw new Error('Une erreur s\'est produite!');
        })
        .catch((err) => {
            console.log(err);   
        });
    };
      
  };

  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">Ajout</IonTitle>
            <IonButtons slot="end">
              <NavButtons/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <IonCard>
        <IonCardHeader>
            <IonCardTitle>Insertion des encheres</IonCardTitle>
            <IonCardSubtitle>Ajouter ici le produits que vous voulez vendre.</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
        <IonList>
            <IonItem>
                 <IonSelect interface="action-sheet" name="idcategorie" placeholder="select-categorie"value={categorieid} onIonChange={(e) => setCategorieid(e.detail.value!)}>
                 {categories?.map((categorie: any) => 
                 <IonSelectOption value={`${categorie.id}`}>{categorie.libelle}</IonSelectOption>
                 )}
            </IonSelect>
        </IonItem>
        </IonList>
          <IonItem>
              <IonLabel position="floating">Intitule</IonLabel>
              <IonInput type="text" name="intitule" id="intitule" value={intitule} onIonChange={(e) => setIntitule(e.detail.value!)}></IonInput>
              <IonNote slot="helper" >Entrer ici le nom de votre produit</IonNote></IonItem>
          <IonItem>
            <IonLabel position="floating">Prix de mise enchere</IonLabel>
              <IonInput type="text" name="prix_mise_enchere" id="pme" value={prix_mise_enchere} onIonChange={(e) => setPrix_mise_enchere(e.detail.value!)}></IonInput>
              <IonNote slot="helper">Entrer le prix de mise enchere</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Description</IonLabel>
              <IonInput type="text" name="description" id="description" value={descrition} onIonChange={(e) => setDescription(e.detail.value!)}></IonInput>
              <IonNote slot="helper">Entrer la description</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Date de fin</IonLabel>
            <IonDatetimeButton datetime="datetime" ></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime" onIonChange={(e) => dateFinChanged(e.detail.value!)}></IonDatetime>
            </IonModal>
              <IonNote slot="helper">Entrer la date limite de l'enchere</IonNote>
          </IonItem>
          <IonItem>
              <input type="file" onChange={handlePhoto_couverture} ></input>
              <IonNote slot="helper">Choisir la photo de couverture</IonNote>
          </IonItem>
          <IonItem>
              <input type="file" onChange={handlePhotos} multiple></input>
              <IonNote slot="helper">Choisir les photos</IonNote>
          </IonItem>

          <IonButton onClick={handleSubmit} expand='block' className='ion-margin-top' color="tertiary">
              Créer
          </IonButton>
          <p color='red'> {message} </p>
        </IonCardContent>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Insertion_enchere;
