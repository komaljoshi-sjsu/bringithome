import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [createChatBotMessage(`Hello world`)],
  botName: "Liz",

  state: {
    orders: [],
  },
  widgets: [{}],
};

export default config;
