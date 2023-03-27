import Select from "react-select";
import { LANGUAGE_OPTIONS } from "./constants";

const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {
  return (
    <div className="flex">
      <Select
        isSearchable
        name="language"
        placeholder="Select a Language"
        className="w-full"
        value={selectedLanguage}
        options={LANGUAGE_OPTIONS}
        onChange={(selectedOption) => setSelectedLanguage(selectedOption)}
      />
    </div>
  );
};

export default LanguageSelector;
