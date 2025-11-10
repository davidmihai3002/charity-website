import { useRouter } from "next/navigation";
import Button from "./Button";
import HomeSectionWrapper from "./HomeSectionWrapper";

const AboutUsHomepageSection = () => {
  const router = useRouter();
  return (
    <HomeSectionWrapper breadcrumb="Know About Us" image="/charity-img2.jpg">
      <div className="flex flex-col gap-8">
        <h2 className="font-bold leading-[120%] text-5xl">
          We provide services for elders with special needs
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
          <br />
          <br />
          ‍Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
          commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus
          id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
        </p>
        <div className="w-[146px] mt-3">
          <Button
            variant="primary"
            text="Learn More"
            onClick={() => router.push("/our-process")}
            className="text-nowrap"
          />
        </div>
      </div>
    </HomeSectionWrapper>
  );
};

export default AboutUsHomepageSection;
