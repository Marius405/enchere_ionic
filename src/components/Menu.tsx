import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonLabel,
  } from "@ionic/react";
  import React from "react";
  
  export const Menu = () => {
    return (
      <IonMenu side="end" contentId="main">
        <IonHeader>
          <IonToolbar color="light">
            <IonTitle>MENU</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle auto-hide="false">
              <IonItem button routerLink={"/insertionenchere"} routerDirection="none">
                <IonLabel>Ajouter enchère</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle auto-hide="false">
              <IonItem button routerLink={"/listeenchere"} routerDirection="none">
                <IonLabel>Vos enchères</IonLabel>
              </IonItem>
              <IonItem button routerLink={"/enchereparticipe"} routerDirection="none">
                <IonLabel>Vos participations</IonLabel>
              </IonItem>
              <IonItem button routerLink={"/rechargecompte"} routerDirection="none">
                <IonLabel>Rechargement compte</IonLabel>
              </IonItem>
              <IonItem button routerLink={"/login"} routerDirection="none">
                <IonLabel>Déconnexion</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
    );
  };