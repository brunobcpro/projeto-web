import { IonApp, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Tab from "../components/Tab-componente";
import axios from "axios";


interface Insumos {
    nome: string,
    unidade: string,
    estoque: number,
    id: number
}

const AdmInsumos: React.FC<Insumos> = () => {

    const [insumo, setInsumo] = useState<Insumos[]>([])
    
    useEffect(() => {
        const loadData =async() => {
            const{data} = await axios.get('http://localhost:3000/admin/insumos')
            setInsumo(data)
        }
        loadData()
    }, [])

    return(
        <IonApp>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Aqui está a situação dos insumos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <table>
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Estoque</th>
                            <th>Unidades</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insumo.map((rec, index) => (
                            <tr key={index}>
                                <td>{rec.nome}</td>
                                <td>{rec.estoque}</td>
                                <td>{rec.unidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </IonContent>
            <Tab/>
        </IonApp>
    )
}

export default AdmInsumos