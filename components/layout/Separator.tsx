const Separator = ({ className }: { className?: string }) => {
  return (
    <span className={`h-px flex w-full ${className} bg-light-text`}></span>
  );
};

export default Separator;
