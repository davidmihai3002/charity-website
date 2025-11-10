const Button = ({
  variant,
  text,
  className,
  onClick,
  buttonType,
  icon,
}: {
  variant: "primary" | "secondary" | "navigation";
  buttonType?: "button" | "submit";
  text: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode | null;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        icon ? "gap-2" : ""
      } cursor-pointer flex flex-row justify-center items-center px-8 h-[51px] rounded-sm ${
        variant === "primary"
          ? " text-dark-text bg-primary-button"
          : variant === "secondary"
          ? " text-dark-text bg-secondary-button"
          : "w-[166px] bg-navbar-button text-light-text h-[43px]"
      }`}
      type={buttonType}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
