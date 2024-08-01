import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { csharp } from "@replit/codemirror-lang-csharp";

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
