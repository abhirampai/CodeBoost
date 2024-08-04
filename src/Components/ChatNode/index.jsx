import { Avatar } from "antd";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

import SystemAvatar from "../../Images/system_avatar.svg";
import UserAvatar from "../../Images/user_avatar.svg";

const ChatNode = ({ message }) => {
  const isMessageInitiatorSystem = message.initiator === "system";

  return (
    <div class="flex flex-col">
      <div class="flex-1 overflow-y-scroll">
        <div class="px-4 py-2">
          {isMessageInitiatorSystem ? (
            <>
              <div class="flex items-center mb-2">
                <Avatar
                  icon={<img src={SystemAvatar} alt="System DP" />}
                  alt="System DP"
                />
                <div class="font-medium px-2">Phi-3</div>
              </div>
              <div class="bg-white rounded-lg p-2 shadow mb-2 max-w-prose">
                <MDEditor.Markdown
                  source={message.message}
                  style={{ padding: 10 }}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                />
              </div>
            </>
          ) : (
            <div class="flex items-center justify-end">
              <div class="bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-prose">
                {message.message}
              </div>
              <Avatar
                icon={<img src={UserAvatar} alt="User DP" />}
                alt="User DP"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatNode;
