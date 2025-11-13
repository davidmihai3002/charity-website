const DonationsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background p-5 rounded-xl w-fit h-fit">{children}</div>
  );
};

export default DonationsWrapper;
