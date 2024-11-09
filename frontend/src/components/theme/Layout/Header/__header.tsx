import './__header.css';

const Header = () => {
   return (
       <header className="bg-white border-b md:px-8 px-4">
          <div className="flex justify-between items-center w-full">
             <form className="w-10/12 py-2.5 sm:block flex items-center">
                <div className="sm:hidden mr-2">
                   <button type="button" className="w-6 h-6">
                      <img src="images/sidebar/menu-bars.png"/>
                   </button>
                </div>
                <div className="flex items-center  relative">
                   <img className="absolute left-0" src="images/sidebar/search.png"/>
                   <input
                       className="text-sm font-normal leading-3 py-2.5 px-3 sm:ml-6 ml-1.5 w-full text-757575"
                       type="text" name="search" placeholder="Search"/>
                </div>
             </form>
             <div className="flex items-center py-4 border-l">
                <button className="w-6 h-6 ml-5">
                   <img src="images/sidebar/notification-bell.png"/>
                </button>
                <button className="w-6 h-6 sm:ml-9 ml-5">
                   <img src="images/sidebar/activity.png"/>
                </button>
                <button className="w-6 h-6 sm:ml-9 ml-5">
                   <img src="images/sidebar/profile.png"/>
                </button>
             </div>
          </div>
       </header>
   )
}

export default Header;