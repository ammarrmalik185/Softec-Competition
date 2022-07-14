import {RiDashboardLine} from 'react-icons/ri';
import {CgCalendar, CgProfile} from 'react-icons/cg';
import {FaTasks} from 'react-icons/fa';
import {BiSearch, BiTask} from 'react-icons/bi';
import {AiOutlineMessage} from 'react-icons/ai';
import Image from "next/image";
import img from '../../assets/profile.png';
import Sidebar from "../../components/Sidebar Patient";
export default function Index(){
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
                    <div className={'flex bg-gray-50 justify-between'}>
                        <div>
                            <div className={'rounded-lg border bg-white'}>
                                <div className={'text-center py-2 border-b'}>
                                    <p>Incoming Patient History</p>
                                </div>
                                <div className={'flex my-4 mx-4'}>
                                    <div className={'space-y-2'}>
                                        <div className={'flex px-4 py-2 pr-16 space-x-2 border rounded-lg hover:shadow-lg hover:scale-105'}>
                                            <CgProfile className={'text-5xl'}/>
                                            <div className={'items-center'}>
                                                <p>New Patient</p>
                                                <p>560</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1>ASDF</h1>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
