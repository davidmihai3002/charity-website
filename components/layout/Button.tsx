const Button = ({
  variant,
  text,
  className,
}: {
  variant: "primary" | "secondary" | "navigation";
  text: string;
  className?: string;
}) => {
  return (
    <button
      className={`${className} cursor-pointer px-8 h-[51px] rounded-sm ${
        variant === "primary"
          ? "w-[171px] text-dark-text bg-primary-button"
          : variant === "secondary"
          ? "w-[191px] text-dark-text bg-secondary-button"
          : "w-[166px] bg-navbar-button text-light-text h-[43px]"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
