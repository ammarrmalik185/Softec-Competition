import Image from 'next/image';

export default function Index(){
    return(
        <div>
            <main className={"flex h-screen"} style={{
                backgroundImage: "url(" + "/assets/loginPageBackground.jpg" + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className='mx-auto my-auto rounded-md shadow-lg bg-blue-500 p-10 space-y-2'>
                    <div style={{textAlign: "center"}}>
                        <Image src="/assets/logo.png" width={150} height={150} alt="Logo"/>
                    </div>
                    <h1 className={'text-center font-semibold text-2xl'}>Welcome to <span style={{color: "blue"}}>V</span> Care</h1>
                    <div className={'flex justify-evenly'}>
                        <div onClick={() => {
                            window.location.href = "/SignupDoctor"
                        }} className={'m-2 py-2 px-1 cursor-pointer rounded-md shadow-sm bg-teal-300 my-2'}>
                            Doctor Signup
                        </div>
                        <div onClick={() => {
                            window.location.href = "/SignupPatient"
                        }} className={'m-2 py-2 px-1 cursor-pointer rounded-md shadow-sm bg-teal-300 my-2'}>
                            Patient Signup
                        </div>
                    </div>
                    <p style={{textAlign: "center"}}>Already have an account?</p>
                    <div className={'flex justify-evenly'}>
                        <div onClick={() => {
                            window.location.href = "/login"
                        }} className={'m-2 py-2 px-6 cursor-pointer rounded-md shadow-sm bg-teal-300 my-2'}>
                            Login
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
