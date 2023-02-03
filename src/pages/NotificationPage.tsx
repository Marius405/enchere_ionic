import React, { useState } from 'react';
import { IonPopover, IonButton, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const NotificationPage: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonTitle>Notifications</IonTitle>
        </IonToolbar>
        </IonHeader>
      <IonButton onClick={() => setShowPopover(true)}>
        Show Popover
      </IonButton>
      <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
      >
        <p>This is a popover</p>
        <IonButton onClick={() => setShowPopover(false)}>
          Close
        </IonButton>
      </IonPopover>
    </IonPage>
  );
};
export default NotificationPage;
