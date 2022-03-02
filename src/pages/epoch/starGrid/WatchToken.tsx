import * as React from 'react';
import {
    IonList,
    IonLabel,
    IonItem,
    IonItemDivider,
    IonModal,IonChip,
    IonText,
    IonButton,
    IonListHeader,IonBadge,
    IonCol, IonRow,IonInput
} from "@ionic/react"
import i18n from "../../../locales/i18n"
interface Props{
    title?:string
    show:boolean
    onCancel:()=>void;
    onOk:(token:string)=>void;
    data:any
}
export const WatchTokens:React.FC<Props> = ({show,title,data,onCancel,onOk})=>{

    return (<>
        <IonModal
            isOpen={show}
            onDidDismiss={() => onCancel()}
            className="epoch-modal"
            mode="ios"
            // swipeToClose={false}
            // backdropDismiss={false}
        >
            <div className="epoch-md">
            <IonList mode="md">
                {
                    title &&
                    <IonListHeader mode="ios">
                        {title}
                    </IonListHeader>
                }
                {
                    data && Object.keys(data).map((token,i)=>{
                        const watched = data[token];
                        return <IonItem key={i}>
                            <IonLabel className="ion-text-wrap">
                                <IonRow>
                                    <IonCol size="2">
                                       <IonText color="secondary">{i+1}</IonText>
                                    </IonCol>
                                    <IonCol size="7">
                                        <small>{token}{watched&&<IonChip color="success">Registered</IonChip>}</small>
                                    </IonCol>
                                    <IonCol size="3">
                                        <IonButton mode="ios" expand="block" fill="outline" size="small" onClick={()=>{
                                            onOk(token)
                                        }}>{i18n.t("Register")}</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonLabel>
                        </IonItem>
                    })
                }
            </IonList>
            </div>
        </IonModal>
    </>)
}
