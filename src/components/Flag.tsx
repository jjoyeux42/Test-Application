import type { StaticImageData } from "next/image";
import _flagsSvg from "../../public/flags.svg";
import type { Language } from "~/utils/languages";

const flagsSvg = _flagsSvg as StaticImageData;

export const Flag = ({
  language,
  width = 84,
  className,
}: {
  language: Language;
  width?: number;
  className?: string;
}) => {
  const height = width * (19.3171 / 24);
  return (
    <svg viewBox={language.viewBox} style={{ height, width }} className={className}>
      <image
        height={flagsSvg.height}
        href={flagsSvg.src}
        width={flagsSvg.width}
      ></image>
    </svg>
  );
};
