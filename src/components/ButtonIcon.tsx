import { ReactNode } from "react";

type ButtonIconProps = {
  className: string,
  onClick: CallableFunction,
  children: ReactNode[],
}

const ButtonIcon = ({ className, onClick, children }: ButtonIconProps) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center w-32 gap-1 py-1 transition-colors ${className}`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;