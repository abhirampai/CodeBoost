import { Alert, Typography } from "antd";
import { useContext } from "react";
import { AppState } from "../../Hooks/utils";

const { Link } = Typography;

const UnsupportedBrowserCallout = () => {
  const { isUnsupportedBrowser } = useContext(AppState);

  return (
    isUnsupportedBrowser.value && (
      <Alert
        banner
        message={
          <>
            Your browser currently doesn't support the refactor code feature.
            Please check&nbsp;
            <Link
              href="https://caniuse.com/?search=WebGPU"
              referrerPolicy="no-referer"
              target="_blank"
            >
              supported browsers
            </Link>
            &nbsp;for more info.
          </>
        }
      />
    )
  );
};

export default UnsupportedBrowserCallout;
