import CodeMirror from "@uiw/react-codemirror";
import { keymap } from "@codemirror/view";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { defaultKeymap } from "@codemirror/commands";
import { EditorView } from "@codemirror/view";

import { mapLanguages } from "./utils";

const CodeEditor = ({
  editorRef = null,
  selectedLanguage,
  value,
  onChange = ()=>{},
  editable = false,
  runCode = ()=>{},
}) => {
  const handleIndentTab = (cm) => {
    const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    cm.replaceSelection(spaces);
  };

  const extensions = [
    keymap.of([
      {
        key: "Mod-Enter",
        run: () => {
          if (editable) runCode();
          return true;
        },
      },
      ...defaultKeymap,
    ]),
    keymap.of([handleIndentTab]),
    mapLanguages(selectedLanguage)(),
    EditorView.lineWrapping,
  ];

  const editorHeight = "calc(80vh - 165px)";

  return (
    <>
      <CodeMirror
        ref={editorRef}
        value={value}
        extensions={extensions}
        theme={sublime}
        onChange={(instance) => onChange(instance)}
        height={editorHeight}
        editable={editable}
        basicSetup={{ defaultKeymap: false }}
      />
    </>
  );
};

export default CodeEditor;
