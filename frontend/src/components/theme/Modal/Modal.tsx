import {PropsWithChildren} from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

interface modalProps {
    open: boolean,
    setOpen: (value: boolean)=>void,
    showCloseButton?: boolean,
    title: string,
    subTitle?: string,
}

const Modal = ({open, setOpen, showCloseButton=true, title, subTitle, children}: PropsWithChildren<modalProps>) => {
    // const [open, setOpen] = useState(show);

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-2xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                    {title}
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {subTitle}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {children}

                        {showCloseButton && <>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-200"/>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="float-right inline-flex right justify-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Close
                                </button>
                            </div>
                        </>
                        }
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default Modal;