import {Link} from 'react-router-dom';
import './__sidebar.css';

const Sidebar = () => {
    return (
        <div id="sidebar-mob" className="h-screen lg-w-220 bg-fafafa mob-sidebar boxshadow-eeeeee font-inter">
            <div className="px-5 py-2 border-b lg:block sm:hidden">
                <div className="w-40 pl-0.5">
                    <Link to="/"><img src="images/logo.png"/></Link>
                </div>
            </div>
            <div className="flex flex-col justify-between h-full px-2.5 pt-4 pb-6 bg-fafafa">
                <div>
                    <form>
                        <div
                            className="lg:border sm:border-0 border rounded lg:bg-white sm:bg-transparent bg-white flex justify-between items-center pl-3 pr-3.5 py-2 relative">
                            <img className="absolute left-3 w-3 h-3" src="images/sidebar/search.png"/>
                            <input
                                className="fs-13 font-normal leading-3 lg:block sm:hidden text-757575 ml-5 h-5 w-3/4 p-2"
                                type="text" name="search" placeholder="Jump to"/>
                            <span
                                className="w-6 h-4 justify-center items-center lg:flex sm:hidden rounded-sm bg-e0e0e0">
									<img className="mx-auto" src="images/sidebar/xs.png"/>
								</span>
                        </div>
                    </form>
                    <div className="border-b pb-2">
                        <Link to="/dashboard" className="flex justify-between items-center rounded py-2.5 px-3.5 mt-6 group hover:bg-[#3575d5]">
                            <div className="flex items-center">
									<span>
										<img className="w-4 h-4 group-hover:hidden" src="images/sidebar/box.png"/>
										<img className="w-4 h-4 group-hover:block hidden" src="images/sidebar/box-white.png"/>
									</span>
                                <span className="fs-13 font-medium leading-3 lg:block sm:hidden text-616161 pl-3 sidebar-links group-hover:text-white">Dashboard</span>
                            </div>
                            <span className="w-6 h-4 justify-center items-center lg:flex sm:hidden rounded-sm bg-e0e0e0">
                                <img className="mx-auto" src="images/sidebar/xd.png"/>
                            </span>
                        </Link>
                    </div>

                    <div>
                        <Link to="/employees"
                           className="flex justify-between items-center rounded py-2.5 px-3.5 group hover:bg-[#3575d5]">
                            <div className="flex items-center">
									<span>
										<img className="w-4 h-4 group-hover:hidden" src="images/sidebar/user.png"/>
										<img className="w-4 h-4 group-hover:block hidden"
                                             src="images/sidebar/user-white.png"/>
									</span>
                                <span
                                    className="fs-13 font-medium leading-3 lg:block sm:hidden text-616161 pl-3 sidebar-links group-hover:text-white">Employees</span>
                            </div>
                        </Link>
                    </div>

                    <div className="border-b pb-2">
                        <a href="#"
                           className="flex justify-between items-center rounded py-2.5 px-3.5 group hover:bg-[#3575d5]">
                            <div className="flex items-center">
									<span>
										<img className="group-hover:hidden w-4 h-4"
                                             src="images/sidebar/notification.png"/>
										<img className="w-4 h-4 group-hover:block hidden"
                                             src="images/sidebar/notification-white.png"/>
									</span>
                                <span
                                    className="fs-13 font-medium leading-3 lg:block sm:hidden text-616161 pl-3 sidebar-links group-hover:text-white">Pop-Ups</span>
                            </div>
                        </a>
                    </div>

                    <div className="">
                        <a href="../create-blasts/create-send.html"
                           className="flex justify-between items-center rounded py-2.5 px-3.5 mt-3 group hover:bg-[#3575d5]">
                            <div className="flex items-center">
									<span>
										<img className="group-hover:hidden w-4 h-4" src="images/sidebar/mail.png"/>
										<img className="w-4 h-4 group-hover:block hidden"
                                             src="images/sidebar/mail-white.png"/>
									</span>
                                <span
                                    className="fs-13 font-medium leading-3 lg:block sm:hidden text-616161 pl-3 sidebar-links group-hover:text-white">E-mail Templates</span>
                            </div>
                        </a>
                    </div>
                    <div className="border-b pb-2">
                        <a href="../integrations/index.html"
                           className="flex justify-between items-center rounded py-2.5 px-3.5 mt-3 sidebar-items group hover:bg-[#3575d5]">
                            <div className="flex items-center">
									<span>
										<img className="w-4 h-4 group-hover:hidden" src="images/sidebar/cloud.png"/>
										<img className="w-4 h-4 group-hover:block hidden"
                                             src="images/sidebar/cloud-white.png"/>
									</span>
                                <span
                                    className="fs-13 font-medium leading-3 lg:block sm:hidden text-616161 pl-3 sidebar-links group-hover:text-white">Integrations</span>
                            </div>
                        </a>
                    </div>
                    <div className="">
                        <a href="../lists-segments/lists.html"
                           className="flex justify-between items-center rounded py-2.5 px-3.5 mt-3 group hover:bg-[#3575d5]">
                            <div className="flex items-center">
									<span>
										<img className="group-hover:hidden w-4 h-4" src="images/sidebar/target.png"/>
										<img className="w-4 h-4 group-hover:block hidden"
                                             src="images/sidebar/target-white.png"/>
									</span>
                                <span
                                    className="fs-13 font-medium leading-3 lg:block sm:hidden text-616161 pl-3 sidebar-links group-hover:text-white">List & Segments</span>
                            </div>
                        </a>
                    </div>
                    <div className="border-b pb-2">
                        <a href="../subscribers-profile/kamron-profile-form.html"
                           className="flex justify-between items-center rounded py-2.5 px-3.5 group hover:bg-[#3575d5]">
                            <div className="flex items-center">
									<span>
										<img className="w-4 h-4 group-hover:hidden" src="images/sidebar/user.png"/>
										<img className="w-4 h-4 group-hover:block hidden"
                                             src="images/sidebar/user-white.png"/>
									</span>
                                <span
                                    className="fs-13 font-medium leading-3 lg:block sm:hidden text-616161 pl-3 sidebar-links group-hover:text-white">Profiles</span>
                            </div>
                        </a>
                    </div>
                    <div className="">
                        <a href="#"
                           className="flex justify-between items-center rounded py-2.5 px-3.5 group hover:bg-[#3575d5]">
                            <div className="flex items-center">
									<span>
										<img className="group-hover:hidden w-4 h-4"
                                             src="images/sidebar/notification.png"/>
										<img className="w-4 h-4 group-hover:block hidden"
                                             src="images/sidebar/notification-white.png"/>
									</span>
                                <span
                                    className="fs-13 font-medium leading-3 lg:block sm:hidden text-616161 pl-3 sidebar-links group-hover:text-white">Pop-Ups</span>
                            </div>
                        </a>
                    </div>
                    <div className="border-b pb-2">
                        <a href="#"
                           className="flex justify-between items-center rounded py-2.5 px-3.5 group hover:bg-[#3575d5]">
                            <div className="flex items-center">
									<span>
										<img className="w-4 h-4 group-hover:hidden" src="images/sidebar/rss.png"/>
										<img className="w-4 h-4 group-hover:block hidden"
                                             src="images/sidebar/data-white.png"/>
									</span>
                                <span
                                    className="fs-13 font-medium leading-3 lg:block sm:hidden text-616161 pl-3 sidebar-links group-hover:text-white">Data Feeds</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div>
                    <div className="">
                        <a href="../account-setting/account-setting-profile-edit.html"
                           className="flex justify-between items-center rounded py-2.5 px-3.5 mt-3 group hover:bg-[#3575d5]">
                            <div className="flex items-center">
									<span>
										<img className="w-4 h-4 group-hover:hidden" src="images/sidebar/setting.png"/>
										<img className="w-4 h-4 group-hover:block hidden"
                                             src="images/sidebar/setting-white.png"/>
									</span>
                                <span
                                    className="fs-13 font-medium leading-3 lg:block sm:hidden text-616161 pl-3 sidebar-links group-hover:text-white">Settings</span>
                            </div>
                        </a>
                    </div>
                    <div className="">
                        <a href="#"
                           className="flex justify-between items-center rounded py-2.5 px-3.5 group hover:bg-[#3575d5]">
                            <div className="flex items-center">
									<span>
										<img className="w-4 h-4 group-hover:hidden" src="images/sidebar/info.png"/>
										<img className="w-4 h-4 group-hover:block hidden"
                                             src="images/sidebar/info-white.png"/>
									</span>
                                <span
                                    className="fs-13 font-medium leading-3 lg:block sm:hidden text-616161 pl-3 sidebar-links group-hover:text-white">Get Help</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;