import Sidebar from "../../components/Sidebar";
import img from '../../assets/profile.png';
import Image from 'next/image';
export default function Profile() {
    return(
        <div>
            <main className={'h-full flex'}>
                <Sidebar/>
                <section className={'w-full my-8 '}>
                    <div className={'text-center space-y-2'}>
                        <div>
                            <Image className={'rounded-lg'} alt={"Doctor Image"} src={img} height={200} width={200}/>
                        </div>
                        <p>Name: Doctor's name</p>
                        <p>Gender: Male</p>
                        <p>Speciality: Doctor speciality</p>
                        <p>Rating: 6.9</p>
                        <p>clinics: asknfa</p>
                    </div>
                </section>

            </main>
        </div>
    )
}
