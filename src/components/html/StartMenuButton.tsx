import {ReactNode} from "react";

export type StartMenuButtonProps = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export default function StartMenuButton({className, onClick, children}: StartMenuButtonProps) {
  return <>
    <button
      className={"bg-blue-500 hover:bg-blue-700 text-xl text-neutral-50 font-black py-0.5 px-6 rounded-md shadow " + className}
      onClick={onClick}
    >
      {children}
    </button>
  </>;
}
