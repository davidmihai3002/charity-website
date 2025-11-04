import { Shell } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="w-fit h-fit animate-spin">
      <Shell />
    </div>
  );
};

export default LoadingSpinner;
