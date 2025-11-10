import React from "react";

const HeadingText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <h1 className={`${className} leading-[120%] text-[64px] font-bold`}>
      {text}
    </h1>
  );
};

export default HeadingText;
