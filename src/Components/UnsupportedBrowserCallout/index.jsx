import { Alert, Typography } from "antd";

import { AppState } from "../../Hooks/utils";
import { useContext } from "react";

const { Link } = Typography;

const UnsupportedBrowserCallout = () => {
  const { isUnsupportedBrowser } = useContext(AppState);

  return (
    isUnsupportedBrowser.value && (
      <Alert
        banner
        message={
          <>
            Your browser currently doesn't support the webGPU. Please
            check&nbsp;
            <Link
              href="https://caniuse.com/?search=WebGPU"
              referrerPolicy="no-referer"
              target="_blank"
            >
              supported browsers
            </Link>
            &nbsp;for more info.
            <br /> We are using Google Gemini for unsupported browsers which is
            free but don't share sensitive info since google might use it to
            improve the model.
          </>
        }
      />
    )
  );
};

export default UnsupportedBrowserCallout;
