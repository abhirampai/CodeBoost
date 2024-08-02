import { StreamLanguage } from "@codemirror/language";
import { cpp } from "@codemirror/lang-cpp";
import { csharp } from "@replit/codemirror-lang-csharp";
import { go } from "@codemirror/legacy-modes/mode/go";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { rust } from "@codemirror/lang-rust";
import { shell } from "@codemirror/legacy-modes/mode/shell";

export const mapLanguages = (value) => {
  const mappedLanguages = {
    javascript,
    python,
    java,
    rust,
    c: cpp,
    "c++": cpp,
    "c#": csharp,
    go: () => StreamLanguage.define(go),
    ruby: () => StreamLanguage.define(ruby),
    bash: () => StreamLanguage.define(shell),
  };
  return mappedLanguages[value];
};
