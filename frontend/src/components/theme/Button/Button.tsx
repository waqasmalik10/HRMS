import {PropsWithChildren, ReactNode} from "react";

interface buttonProps {
    onClick?: () => void,
    type: "submit" | "reset" | "button",
    children?: ReactNode,
}

const Button = ({onClick, type, children}: PropsWithChildren<buttonProps>) => {
    return (
        <button
            type={type}
            onClick={ onClick }
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {children}
        </button>
    )
}

export default Button;