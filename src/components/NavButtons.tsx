import { IonButton, IonMenuButton } from "@ionic/react";
import React, { useEffect } from "react";

export const NavButtons = () => {
  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 768 ? true : false,
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);

    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  // MediaQueryListEvent { isTrusted: true, media: "(min-width: 768px)", matches: true ...}
  //console.log(mQuery.matches);

  return (
    <div>
      {mQuery && !mQuery.matches ? (
        <IonMenuButton />
      ) : (
        <>
          <IonButton routerLink={"/insertionenchere"}>Ajouter enchère </IonButton>
          <IonButton routerLink={"/listeenchere"}>Vos enchères </IonButton>
          <IonButton routerLink={"/enchereparticipe"}>Vos participations</IonButton>
          <IonButton routerLink={"/rechargecompte"}>Rechargement compte</IonButton>
          <IonButton routerLink={"/login"}>Déconnexion</IonButton>
        </>
      )}
    </div>
  );
};