import { useRouter } from "next/navigation";
import Button from "../layout/Button";
import HeadingText from "../layout/HeadingText";
import { HandHelping } from "lucide-react";
import Separator from "../layout/Separator";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="w-screen flex h-[87vh] bg-red-300 bg-[url('/hero-img.jpg')] bg-cover pt-[200px] pl-[110px] pb-16">
      <div className="flex flex-col w-full h-full justify-between">
        <div className="max-w-[640px] flex flex-col h-fit gap-12">
          <HeadingText
            text={"Dedicated to supporting seniors with everyday tasks"}
            className="text-light-text"
          />
          <div className="w-fit flex flex-row gap-4">
            <Button
              text={"What we do"}
              variant="secondary"
              className="text-nowrap max-w-[148px]"
              onClick={() => router.push("/our-process")}
            />
            <Button
              text={"Our mission"}
              variant="secondary"
              className="text-nowrap max-w-[148px] bg-transparent  text-light-text"
              onClick={() => router.push("/media")}
              icon={<HandHelping />}
            />
          </div>
        </div>
        <div className="w-full pr-[110px] gap-10 flex items-center justify-between">
          <p className="text-light-text text-nowrap font-medium text-xl">
            Over 100 elders helped
          </p>
          <Separator />
          <p className="text-light-text text-nowrap font-medium text-xl">
            600 donations collected
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
