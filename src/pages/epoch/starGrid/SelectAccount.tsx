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
           <h3 style={{textAlign:"center"}}>Connect Wallet</h3>
           <IonRow className="justify-content-center">
              <IonCol >
                 <div style={{padding:"12px 0 0",textAlign:"center"}} onClick={()=>{
                    onOk(2)
                 }}>
                    <img src="./assets/img/metamask.svg" width={50} height={50} />
                    <h6>MetaMask</h6>
                 </div>
              </IonCol>
              <IonCol >
                 <div style={{padding:"12px 0 0",textAlign:"center"}} onClick={()=>{
                    onOk(2)
                 }}>
                    <img src="./assets/img/coinbase.svg" width={50} height={50} />
                    <h6>Coinbase</h6>
                 </div>
              </IonCol>
              <IonCol>
                 <div style={{padding:"12px 0 0",textAlign:"center"}} onClick={()=>{
                    onOk(2)
                 }}>
                    <img src="./assets/img/TWT.png" width={50} height={50} />
                    <h6>Trust Wallet</h6>
                 </div>
              </IonCol>
           </IonRow>
           <IonRow>
              {/*<IonCol><IonButton expand="block" color="primary" onClick={()=>{*/}
              {/*   onOk(1);*/}
              {/*}}>EMIT ACCOUNT</IonButton></IonCol>*/}
              <IonCol><IonButton expand="block" color="primary" onClick={()=>{
                 onOk(2)
              }}>Connect</IonButton></IonCol>
           </IonRow>
        </div>
      </IonModal>
   </>
}

export default SelectAccount;