import * as React from 'react';
import {IonModal,IonButton,IonRow,IonCol,IonList,IonListHeader,IonItemDivider} from '@ionic/react'

interface Props{
   isOpen: boolean;
   onOk: (type:number)=>void;
   onCancel: ()=>void;
}

const SelectAccount:React.FC<Props> = ({isOpen,onCancel,onOk}) => {
   return <>
      <IonModal isOpen={isOpen} onDidDismiss={()=>onCancel()} className="modal-select-account">
        <div className="select-account-btn">
           <IonRow>
              {/*<IonCol><IonButton expand="block" color="primary" onClick={()=>{*/}
              {/*   onOk(1);*/}
              {/*}}>EMIT ACCOUNT</IonButton></IonCol>*/}
              <IonCol><IonButton expand="block" color="primary" onClick={()=>{
                 onOk(2)
              }}>METAMASK</IonButton></IonCol>
           </IonRow>
        </div>
      </IonModal>
   </>
}

export default SelectAccount;