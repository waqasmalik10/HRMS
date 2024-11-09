const Breadcrumbs = () => {
    return (
        <div className="md:px-1.5">
            <div className="mb-6">
                <ul className="pl-0 mb-0 flex items-center">
                    <li className="flex items-center">
                        <a href="#/" className="flex items-center">
									<span className="mr-1.5">
										<img className="w-4 h-4" src="images/breadcrumbs/back-arrow.png"
                                             alt="List Icon"/>
									</span>
                            <span className="sm:text-sm text-xs font-medium leading-3 text-616161">Lists &
										Segments</span>
                        </a>
                    </li>
                    <li className="sm:ml-1.5 sm:mr-2 mx-0.5 sm:text-base text-sm">
                        /
                    </li>
                    <li>
                        <a href="#/">
									<span
                                        className="sm:text-[13px] text-[11px] font-medium leading-3 text-616161">Segments</span>
                        </a>
                    </li>
                    <li className="sm:ml-1.5 sm:mr-2 mx-0.5 sm:text-base text-sm">
                        /
                    </li>
                    <li>
                        <a href="#/">
									<span className="sm:text-[13px] text-[11px] font-medium leading-3 text-bdbdbd">Create
										Segment</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Breadcrumbs;