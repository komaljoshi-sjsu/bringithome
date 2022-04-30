import { createChatBotMessage } from "react-chatbot-kit";
import ServiceProviderOptions from "../chatWidgets/ServiceProviderOptions";
import FindService from "../chatWidgets/FindServices";

const config = {
  initialMessages: [createChatBotMessage(`Hello world`)],
  botName: "Liz",
  widgets: [
    {
      widgetName: "chatOptions",
      widgetFunc: (props) => <ServiceProviderOptions {...props} />,
      mapStateToProps: ["options"],
    },
    {
      widgetName: "serviceProviderList",
      widgetFunc: (props) => <FindService {...props} />,
      mapStateToProps: ["serviceProvidersList"],
    },
  ],
  state: {
    options: [],
    serviceProvidersList: [],
  },
};

export default config;
