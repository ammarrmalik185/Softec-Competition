import Sidebar from "../../components/Sidebar";
import {DataGrid} from "@mui/x-data-grid";
import {useRouter} from "next/router";
import {collection, doc,getDocs, getFirestore, query, where} from "firebase/firestore";
import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'ClinicName', headerName: 'Clinic Name', width: 130 },
    { field: 'Rating', headerName: 'Rating', width: 130 },
    { field: 'Location', headerName: 'Location', width: 130 },
];

const rows = [
    { id: 1, ClinicName: 'Snow', Rating: 4.8, Location: "Pindi" },
    { id: 2, ClinicName: 'Snow', Rating: 4.8, Location: "Pindi" },
    { id: 3, ClinicName: 'Snow', Rating: 4.8, Location: "Pindi" },
    { id: 4, ClinicName: 'Snow', Rating: 4.8, Location: "Pindi" },
    { id: 5, ClinicName: 'Snow', Rating: 4.8, Location: "Pindi" },

    ];
export default function Clinic() {
    const [clinics, setClinics] = useState([]);
    const router = useRouter();
    const auth = getAuth();
    const db = getFirestore();
    useEffect(()=>{
        console.log(getAuth());
        getDocs(query(collection(db, 'clinics')), where('doctor', 'array-contains', getAuth().currentUser.phoneNumber)).then(r => {
            r.docs.forEach((doc,ind) => {
                console.log(doc.data());
                setClinics(clinics => [...clinics, {...doc.data(), id:ind}]);
            });
        });
    },[]);
    return(
        <div>
            <main className={'h-full flex'}>
                <Sidebar/>
                <section className={'my-8 w-full space-y-4'}>
                    <h1 className={'text-3xl font-bold text-center'}>My Clinics</h1>
                    <DataGrid
                        className={'h-[500px] w-full'}
                        rows={clinics}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                    <div className={'flex justify-center'}>
                        <button
                            onClick={()=> router.push('add_clinic')}
                            className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'}>
                            Add Clinic
                        </button>
                    </div>
                </section>
            </main>
        </div>
    )
};
