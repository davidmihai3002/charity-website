import { IconNode } from "lucide";

const Button = ({
  variant,
  text,
  className,
  onClick,
  buttonType,
}: {
  variant: "primary" | "secondary" | "navigation";
  buttonType?: "button" | "submit";
  text: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} cursor-pointer flex justify-center items-center px-8 h-[51px] rounded-sm ${
        variant === "primary"
          ? " text-dark-text bg-primary-button"
          : variant === "secondary"
          ? " text-dark-text bg-secondary-button"
          : "w-[166px] bg-navbar-button text-light-text h-[43px]"
      }`}
      type={buttonType}
    >
      {text}
    </button>
  );
};

export default Button;
