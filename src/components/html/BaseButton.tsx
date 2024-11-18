import {ReactNode} from "react";
import {ButtonType} from "@/components/html/ButtonType.ts";

type BaseButtonProps = {
  className?: string;
  type?: ButtonType;
  onClick?: () => void;
  children: ReactNode;
}

const buttonTypeClasses = {
  [ButtonType.PRIMARY]: "bg-sky-600 hover:bg-sky-700 active:bg-sky-800 border-sky-700 hover:border-sky-800",
  [ButtonType.SECONDARY]: "bg-neutral-600 hover:bg-neutral-700 active:bg-neutral-800 border-neutral-700 hover:border-neutral-800",
  [ButtonType.TERTIARY]: "bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700 border-neutral-600 hover:border-neutral-700",
  [ButtonType.WARNING]: "bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 border-yellow-700 hover:border-yellow-800",
  [ButtonType.DANGER]: "bg-red-500 hover:bg-red-600 active:bg-red-700 border-red-600 hover:border-red-700",
}

export default function BaseButton({className, type = ButtonType.PRIMARY, onClick, children}: BaseButtonProps) {

  const buttonColorClasses = buttonTypeClasses[type] || buttonTypeClasses[ButtonType.PRIMARY];

  return <>
    <button
      className={`w-fit px-2 rounded-md text-xl font-black shadow-md border text-neutral-100 ${buttonColorClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  </>
}
