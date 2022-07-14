import {AiOutlineMessage} from 'react-icons/ai';
import {useRouter} from "next/router";
import {RiDashboardLine} from "react-icons/ri";
import {CgCalendar, CgProfile} from "react-icons/cg";
import {FaTasks} from "react-icons/fa";
import {BiTask} from "react-icons/bi";
import {GiHealthNormal} from "react-icons/gi";

const Sidebar = () => {
  const router = useRouter();
  return(
      <section className={'border rounded-lg px-4 py-4 w-[300px] h-screen'}>
          <div className={'mb-8'}>
              <div>

              </div>
              <div className={'flex justify-center text-2xl'}>
                  <p className={'text-teal-400'}>Health</p>
                  <p>Care</p>
              </div>
          </div>
          <div className={'justify-center space-y-4'}>
              <div className={"doctor-sidebar-item"}
                   onClick={()=> router.push('dashboard')}
              >
                  <RiDashboardLine/>
                  <p>Overview</p>
              </div>
              <div className={"doctor-sidebar-item"}
                   onClick={()=> router.push('profile')}>
                  <CgProfile/>
                  <p>Profile</p>
              </div>
              <div className={"doctor-sidebar-item"}
                   onClick={()=> router.push('calender')}>
                  <CgCalendar/>
                  <p>Calender</p>
              </div>
              <div className={"doctor-sidebar-item"}
                   onClick={()=> router.push('clinic')}
              >
                  <GiHealthNormal />
                  <p>Clinics</p>
              </div>
              <div className={"doctor-sidebar-item"}
                   onClick={()=> router.push('appointments')}>
                  <BiTask/>
                  <p>Appointments</p>
              </div>
              <div className={"doctor-sidebar-item"}
                   onClick={()=> router.push('messages')}>
                  <AiOutlineMessage/>
                  <p>Message</p>
              </div>



          </div>
      </section>


  );
}
export default Sidebar;
