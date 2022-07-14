import Sidebar from "../../components/Sidebar";
import img from "../../assets/profile.png";
import Image from"next/image";
export default function Calender() {
    return(
        <div>
            <main className={'h-full flex'}>
                <Sidebar/>
                <section className={'flex w-full'}>
                    <div className={'w-[250px] h-full border-r '}>
                        <div className={"border-b p-4"}>
                            <h1 className={'text-2xl font-bold text-center'}>Messenger</h1>
                        </div>
                        <div className={'flex p-2 space-x-2 border-b cursor-pointer hover:bg-teal-50 hover:scale-110 hover:shadow-lg rounded-md'}>
                            <div>
                                <Image src={img} height={50} width={50} className={"rounded-full"}/>
                            </div>
                            <div>
                                <p>Patient name</p>
                                <div className={'flex justify-between'}>
                                    <p>Male</p>
                                    <p>30</p>
                                </div>
                            </div>
                        </div>
                        <div className={'flex p-2 space-x-2 border-b cursor-pointer hover:bg-teal-50 hover:scale-110 hover:shadow-lg rounded-md'}>
                            <div>
                                <Image src={img} height={50} width={50} className={"rounded-full"}/>
                            </div>
                            <div>
                                <p>Patient name</p>
                                <div className={'flex justify-between'}>
                                    <p>Male</p>
                                    <p>30</p>
                                </div>
                            </div>
                        </div>
                        <div className={'flex p-2 space-x-2 border-b cursor-pointer hover:bg-teal-50 hover:scale-110 hover:shadow-lg rounded-md'}>
                            <div>
                                <Image src={img} height={50} width={50} className={"rounded-full"}/>
                            </div>
                            <div>
                                <p>Patient name</p>
                                <div className={'flex justify-between'}>
                                    <p>Male</p>
                                    <p>30</p>
                                </div>
                            </div>
                        </div>
                        <div className={'flex p-2 space-x-2 border-b cursor-pointer hover:bg-teal-50 hover:scale-110 hover:shadow-lg rounded-md'}>
                            <div>
                                <Image src={img} height={50} width={50} className={"rounded-full"}/>
                            </div>
                            <div>
                                <p>Patient name</p>
                                <div className={'flex justify-between'}>
                                    <p>Male</p>
                                    <p>30</p>
                                </div>
                            </div>
                        </div>
                        <div className={'flex p-2 space-x-2 border-b cursor-pointer hover:bg-teal-50 hover:scale-110 hover:shadow-lg rounded-md'}>
                            <div>
                                <Image src={img} height={50} width={50} className={"rounded-full"}/>
                            </div>
                            <div>
                                <p>Patient name</p>
                                <div className={'flex justify-between'}>
                                    <p>Male</p>
                                    <p>30</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'relative p-4 w-full h-full'}>
                        <h1 className={'text-center text-2xl font-bold border-b'}>Chat</h1>
                        <div className={'flex-grow overflow-y-scroll'}>
                            <div className={'flex flex-col p-4 border-b'}>
                                <div className={'flex space-x-2'}>
                                    <div>
                                        <Image src={img} height={50} width={50} className={"rounded-full"}/>
                                    </div>
                                    <div>
                                        <p>Patient name</p>
                                        <p>Message</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'flex flex-col p-4 border-b'}>
                                <div className={'flex space-x-2'}>
                                    <div>
                                        <Image src={img} height={50} width={50} className={"rounded-full"}/>
                                    </div>
                                    <div>
                                        <p>Patient name</p>
                                        <p>Message</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'flex flex-col p-4 border-b'}>
                                <div className={'flex space-x-2'}>
                                    <div>
                                        <Image src={img} height={50} width={50} className={"rounded-full"}/>
                                    </div>
                                    <div>
                                        <p>Patient name</p>
                                        <p>Message</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'flex flex-col p-4 border-b'}>
                                <div className={'flex space-x-2'}>
                                    <div>
                                        <Image src={img} height={50} width={50} className={"rounded-full"}/>
                                    </div>
                                    <div>
                                        <p>Patient name</p>
                                        <p>Message</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'flex flex-col p-4 border-b'}>
                                <div className={'flex space-x-2'}>
                                    <div>
                                        <Image src={img} height={50} width={50} className={"rounded-full"}/>
                                    </div>
                                    <div>
                                        <p>Patient name</p>
                                        <p>Message</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'flex flex-col p-4 border-b'}>
                                <div className={'flex space-x-2'}>
                                    <div>
                                        <Image src={img} height={50} width={50} className={"rounded-full"}/>
                                    </div>
                                    <div>
                                        <p>Patient name</p>
                                        <p>Message</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'flex flex-col p-4 border-b'}>
                                <div className={'flex space-x-2'}>
                                    <div>
                                        <Image src={img} height={50} width={50} className={"rounded-full"}/>
                                    </div>
                                    <div>
                                        <p>Patient name</p>
                                        <p>Message</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'absolute bottom-0 '}>
                            <div className={' border rounded-xl flex'}>
                                <input className={'w-full border-0 p-2 outline-0'} placeholder={"Enter your message"}/>
                                <button className={'bg-black text-white p-2 rounded-xl'}>Send</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
