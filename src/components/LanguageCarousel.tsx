import Link from "next/link";
import React from "react";
import languages from "~/utils/languages";
import { useBoundStore } from "~/hooks/useBoundStore";
import { Flag } from "./Flag";

declare global {
  interface Element {
    offsetLeft: number;
  }
}

export const LanguageCarousel = () => {
  const setLanguage = useBoundStore((x) => x.setLanguage);

  return (
    <article className="absolute bottom-0 left-0 right-0 hidden h-20 items-center justify-center bg-[#0a4a82] text-white md:flex">
      <div className="flex w-full max-w-5xl justify-center">
        <div className="flex items-center gap-6">
          {languages.map((language) => {
            return (
              <Link
                key={language.code}
                className="flex items-center gap-2"
                href={"/learn"}
                onClick={() => setLanguage(language)}
              >
                <Flag language={language} width={40} />
                <span className="text-sm font-bold uppercase">
                  {language.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </article>
  );
};
