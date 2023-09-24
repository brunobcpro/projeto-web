import { IonApp, IonContent} from "@ionic/react";
import React from "react";
import CompInsumosAdm from "../components/CompInsumos";

const AdmInsumos: React.FC = () => {

    return(
        <IonApp>
            <IonContent>
                <CompInsumosAdm nome={""} unidade={""} estoque={0} id={0} />
            </IonContent>
        </IonApp>
    )
}

export default AdmInsumos