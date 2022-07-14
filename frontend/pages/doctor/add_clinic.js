import Sidebar from "../../components/Sidebar";
import { collection, doc, getDoc, setDoc , getFirestore } from "firebase/firestore"
import {useState} from "react";
import {getAuth} from "firebase/auth";
import {useRouter} from "next/router";
export default function Add_clinic() {
    const db = getFirestore();
    const [clinicName, setClinicName] = useState("");
    const [clinicLocation, setClinicLocation] = useState("");
    const router = useRouter()
    const auth = getAuth();
    return(
        <div>
            <main className={'h-full flex'}>
                <Sidebar/>
                <section className={"my-8 mx-8 w-full space-y-4 justify-center"}>
                    <h1 className={"text-3xl font-bold text-center"}>Create Clinic</h1>
                    <div className={'space-y-4 text-center'}>
                        <div className={''}>
                            <label>Clinic Name: </label>
                            <div className={'px-2 py-2 inline-block border rounded-md'}>
                                <input type={'text'} placeholder={"Enter Clinic Name"} onChange={event => setClinicName(event.target.value)}/>
                            </div>
                        </div>
                        <div className={''}>
                            <label>Clinic Location: </label>
                            <div className={'px-2 py-2 inline-block border rounded-md'}>
                                <input type={'text'} placeholder={"Enter Clinic Location"} onChange={event => setClinicLocation(event.target.value)}/>
                            </div>
                        </div>
                        <button className={'px-4 py-2 bg-blue-500 text-white rounded-md'}
                                onClick={()=>{
                                    setDoc(doc(collection(db, "clinics")), {
                                        name: clinicName,
                                        location: clinicLocation,
                                        doctor: [getAuth().currentUser.phoneNumber]
                                    }).then(r => router.reload());
                                }}
                        >
                            Create Clinic
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
