import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

const ChatNode = ({ message }) => {
  const isMessageInitiatorSystem = message.initiator === "system";

  return (
    <div class="flex flex-col">
      <div class="bg-gray-200 flex-1 overflow-y-scroll">
        <div class="px-4 py-2">
          {isMessageInitiatorSystem ? (
            <>
              <div class="flex items-center mb-2">
                <img
                  class="w-8 h-8 rounded-full mr-2"
                  src="https://picsum.photos/50/50"
                  alt="User Avatar"
                />
                <div class="font-medium">Phi-3</div>
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
              <img
                class="w-8 h-8 rounded-full"
                src="https://picsum.photos/50/50"
                alt="User Avatar"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatNode;
