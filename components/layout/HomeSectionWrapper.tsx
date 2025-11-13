import Separator from "./Separator";
import Image from "next/image";

const HomeSectionWrapper = ({
  children,
  footer = null,
  className,
  breadcrumb,
  image,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode | null;
  className?: string;
  breadcrumb: string;
  image: string;
}) => {
  return (
    <div className={`${className} h-fit w-screen py-20 px-26 flex flex-col`}>
      <div className="w-full flex flex-row justify-between gap-30">
        <div className="flex flex-row items-start flex-1 gap-3">
          <div className="w-16 pt-[9px]">
            <Separator className="h-0.5! bg-foreground!" />
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-sm font-medium">{breadcrumb.toUpperCase()}</p>
            {children}
          </div>
        </div>
        <Image
          src={image}
          alt=""
          width={480}
          height={580}
          className="shadow-sm rounded-3xl"
        />
      </div>
      {footer && <>{footer}</>}
    </div>
  );
};

export default HomeSectionWrapper;
