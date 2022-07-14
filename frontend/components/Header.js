import {useState} from "react";
import NavbarItem from "./Navbar-Item";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>
                </svg>
                <span className="font-semibold text-xl tracking-tight">Training Management</span>
            </div>
            <div className="block md:hidden"
                 onClick={() => setIsOpen(!isOpen)}
            >
                <button
                    className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div
                className="hidden block flex-grow md:flex items-center w-auto ">
                <div
                    className="text-sm md:flex-grow">
                    <NavbarItem Name={"Home"} Link={'/Admin/'}/>
                    <NavbarItem Name={"About Us"} Link={'/Admin/'}/>
                </div>
                <div className={'block md:inline-block text-sm'}>
                    <NavbarItem Name={"Become an Employer"} Link={'/Admin/register'}/>
                    <div className={'block md:inline-block'}>
                        <NavbarItem Name={"Sign Up"} Link={'/Admin/'}/>
                        <NavbarItem Name={"login"} Link={'/Admin/'}/>
                    </div>
                </div>
            </div>
            <div
                 className="w-full block md:hidden  ">
                <div
                    style={isOpen ? {display: "block"} : {display: "none"}}
                    className="text-sm md:flex-grow">
                    <NavbarItem Name={"Home"} Link={'/Admin/'}/>
                    <NavbarItem Name={"About Us"} Link={'/Admin/'}/>
                </div>
                <div style={isOpen ? {display: "block"} : {display: "none"}}
                     className={'block md:inline-block text-sm'}>
                    <NavbarItem Name={"Become an Employer"} Link={'/Admin/register'}/>
                    <div className={'block md:inline-block'}>
                        <NavbarItem Name={"Sign Up"} Link={'/Admin/'}/>
                        <NavbarItem Name={"login"} Link={'/Admin/'}/>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Header;
