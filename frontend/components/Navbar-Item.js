import {useRouter} from "next/router";
function NavbarItem({Name, Link, Icon, Active}) {
    const router = useRouter();
    return(
        <a onClick={()=>{
            router.push(Link);
        }}
           className="cursor-pointer border-b-2 border-b-black block md:inline-block md:mt-0 text-white hover:text-black mr-4 hover:bg-teal-300 py-2 px-1 mt-4 md:hover:bg-transparent md:border-b-0">
            {Name}
        </a>
    )

}
export default NavbarItem;
