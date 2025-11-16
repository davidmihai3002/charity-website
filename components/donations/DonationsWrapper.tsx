import { useDonations } from "@/lib/context/DonationsContext";
import InfoMessage from "../auth/InfoMessage";

const DonationsWrapper = ({ children }: { children: React.ReactNode }) => {
  const { infoMessage } = useDonations();
  return (
    <div className="bg-background p-5 rounded-xl w-fit h-fit">
      {children}
      {infoMessage && (
        <>
          <br />
          <InfoMessage type={infoMessage.type} message={infoMessage.message} />
        </>
      )}
    </div>
  );
};

export default DonationsWrapper;
