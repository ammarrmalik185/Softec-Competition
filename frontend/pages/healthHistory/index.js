import {RiDashboardLine} from 'react-icons/ri';
import {CgCalendar, CgProfile} from 'react-icons/cg';
import {FaTasks} from 'react-icons/fa';
import {BiSearch, BiTask} from 'react-icons/bi';
import {AiOutlineMessage} from 'react-icons/ai';
import Image from "next/image";
import img from '../../assets/profile.png';
import Sidebar from "../../components/Sidebar Patient";
import {useEffect, useState} from "react";
import {collection, getFirestore, doc, setDoc, getDocs, query, where} from "firebase/firestore";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default function Index(){
    const [patientHistory, setPatientHistory] = useState([]);
    const [addMore, setAddMore] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [doctor, setDoctor] = useState('');
    const [status, setStatus] = useState('Pending');

    const [init, setInit] = useState(false);
    const auth = getAuth();
    const db = getFirestore()

    function reloadDocs(){
        getDocs(query(collection(db, "patientHistory"), where('phoneNumber', '==', auth.currentUser.phoneNumber))).then(snapshot => {
            if(snapshot.empty){
                console.log('No matching documents.');
                return;
            }

            let newPatientHistory = [];
            snapshot.forEach(doc => {
                newPatientHistory = [...newPatientHistory, doc.data()];
            });
            setPatientHistory(newPatientHistory)
        });
    }

    useEffect(() => {
        if (!init){
            onAuthStateChanged(auth, (user) => {
                if(user){
                    reloadDocs()
                }
            });
            setInit(true);
        }
    }, [init, setInit, setPatientHistory, patientHistory, auth, db, reloadDocs]);



    function showSnackbarAlert(message){
        let snackBar = document.getElementById("snackbar");
        snackBar.innerText = message;
        snackBar.className = "show";

        setTimeout(function(){
                snackBar.className = snackBar.className.replace("show", "");
            }, 3000
        );
    }

    function addHistory() {
        let data = {
            title: title,
            description: description,
            time: time,
            date: date,
            duration: duration,
            doctor: doctor,
            status: status,
            phoneNumber: auth.currentUser.phoneNumber,
        }
        setDoc(doc(collection(db, "patientHistory")), data).then(() =>{
            showSnackbarAlert("History added successfully");
            reloadDocs()
        }).catch(e => {
            showSnackbarAlert("Error adding history");
            console.log(e)
        })
    }

    return(
        <div>
            <main className={'flex h-full'}>
                <Sidebar/>
                <section className={'my-2 mx-4 w-full'}>
                    <div className={'flex justify-between my-4'}>
                        <div className={'px-2 py-1 border rounded-lg flex items-center'}>
                            <BiSearch className={"text-xl mr-2"}/>
                            <input type={'text'} className={'outline-0'} placeholder={'Search'}/>
                        </div>
                        <div className={'flex items-center space-x-2 font-semibold'}>
                            <Image src={img} className={'rounded-full'} height={30} width={30}/>
                            <p>Doctors Name</p>
                        </div>
                    </div>
                    <div className={'bg-gray-50 justify-between'}>
                        <div className={'patientHistoryContainer'} style={{width: "100%"}} >
                            {patientHistory && patientHistory.map((item, index) => {
                                return (
                                    <div key={index} className={"bg-blue-500 p-2 m-2"} style={{borderRadius: 10, width: "100%"}}>
                                        <h1><span style={{fontSize: 20, fontWeight: "bold"}}>Title: </span>{item.title}</h1>
                                        <p><span style={{fontSize: 20, fontWeight: "bold"}}>Description: </span>{item.description}</p>
                                        {item.time && <p><span style={{fontSize: 20, fontWeight: "bold"}}>Time: </span>{item.time}</p>}
                                        {item.date && <p><span style={{fontSize: 20, fontWeight: "bold"}}>Date: </span>{item.date}</p>}
                                        {item.duration && <p><span style={{fontSize: 20, fontWeight: "bold"}}>Duration: </span>{item.duration}</p>}
                                        {item.doctor && <p><span style={{fontSize: 20, fontWeight: "bold"}}>Doctor Name: </span>{item.doctor}</p>}
                                        {item.status && <p><span style={{fontSize: 20, fontWeight: "bold"}}>Status: </span>{item.status}</p>}
                                    </div>
                                )
                            })}
                        </div>
                        <div className={'flex justify-center'}>
                            <button className={'bg-blue-500 text-white px-4 py-2 rounded-lg'} onClick={() => setAddMore(true)}>Add More</button>
                        </div>
                    </div>
                </section>
            </main>
            {addMore && <div className='dialog' id='reportFileDialog'>
                <div className='dialogContent'
                     style={{display: "flex", flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
                    <div className="dialogActualContent" id='dialogContent'>
                        <h1 style={{fontSize: 40}}>Add History</h1>
                        <div>
                            <div className="loginFormSingleFieldContainer">
                                <label className='loginFormLabel'>Enter Title</label>
                                <input className='loginFormField'
                                       onChange={(event => setTitle(event.target.value))}/>
                            </div>
                            <div className="loginFormSingleFieldContainer">
                                <label className='loginFormLabel'>Enter Description</label>
                                <textarea className='loginFormField'
                                       onChange={(event => setDescription(event.target.value))}/>
                            </div>
                            <div className="loginFormSingleFieldContainer">
                                <label className='loginFormLabel'>Enter Time</label>
                                <input className='loginFormField'
                                       type={'time'}
                                       onChange={(event => setTime(event.target.value))}/>
                            </div>
                            <div className="loginFormSingleFieldContainer">
                                <label className='loginFormLabel'>Enter Date</label>
                                <input className='loginFormField'
                                       type={'date'}
                                       onChange={(event => setDate(event.target.value))}/>
                            </div>
                            <div className="loginFormSingleFieldContainer">
                                <label className='loginFormLabel'>Enter Duration</label>
                                <input className='loginFormField'
                                       onChange={(event => setDuration(event.target.value))}/>
                            </div>
                            <div className="loginFormSingleFieldContainer">
                                <label className='loginFormLabel'>Enter Doctor Name</label>
                                <input className='loginFormField'
                                       onChange={(event => setDoctor(event.target.value))}/>
                            </div>
                            <div className="loginFormSingleFieldContainer">
                                <label className='loginFormLabel'>Enter Status</label>
                                <select className='loginFormField'
                                        onChange={(event => setStatus(event.target.value))}>
                                    <option value={'Pending'}>Pending</option>
                                    <option value={'Completed'}>Completed</option>
                                    <option value={'Cancelled'}>Cancelled</option>
                                    <option value={'Missed'}>Missed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={'flex justify-center space-x-10'}>
                            <button className={'bg-green-500 text-white px-6 py-2 rounded-lg'} onClick={() => {
                                addHistory();
                                setAddMore(false);
                            }}>Add</button>
                            <button className={'bg-red-500 text-white px-6 py-2 rounded-lg'} onClick={() => setAddMore(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>}
            <div id="snackbar"/>
        </div>
    )
}
