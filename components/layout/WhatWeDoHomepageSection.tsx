import { Apple, Dog, HandHeart, UsersRound } from "lucide-react";
import HomeSectionWrapper from "./HomeSectionWrapper";

const services = [
  {
    icon: <UsersRound color="#fcedc6" width={16} height={16} />,
    title: "Family Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  },
  {
    icon: <HandHeart color="#fcedc6" width={16} height={16} />,
    title: "Health Benefits",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  },
  {
    icon: <Apple color="#fcedc6" width={16} height={16} />,
    title: "Groceries",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  },
  {
    icon: <Dog color="#fcedc6" width={16} height={16} />,
    title: "Therapy",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
  },
];

const WhatWeDoHomepageSection = () => {
  return (
    <HomeSectionWrapper
      breadcrumb="What We Do"
      image="/charity-img2.jpg"
      className="bg-yellow-light"
    >
      <div className="flex flex-col gap-8">
        <h2 className="font-bold leading-[120%] text-5xl">
          Some services we provide services for elders
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </p>
        <div className="flex flex-col items-start gap-6 pl-6">
          {services.map((service, index) => (
            <div key={index} className="flex flex-row gap-6">
              <div className="w-7 h-7 flex items-center justify-center rounded-sm bg-foreground">
                {service.icon}
              </div>
              <div className="flex flex-col justify-center gap-2 max-w-[440px]">
                <p className="font-bold text-2xl">{service.title}</p>
                <p className="font-normal leading-[160%]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeSectionWrapper>
  );
};

export default WhatWeDoHomepageSection;
