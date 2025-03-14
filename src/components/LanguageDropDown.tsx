import { Flag } from "./Flag";
import languages from "~/utils/languages";

export const LanguageDropDown = () => {
  return (
    <div className="relative hidden items-center md:flex">
      <span className="text-md uppercase">Langue du site: Français</span>{" "}
      <Flag language={languages[0]} width={24} className="ml-2" />
    </div>
  );
};
