export type Language = (typeof languages)[number];

const languages = [
  {
    name: "French",
    nativeName: "Français",
    viewBox: "0 132 82 66",
    code: "fr",
  },
] as const;

export default languages;
