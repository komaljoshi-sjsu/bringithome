import { createChatBotMessage } from "react-chatbot-kit";
import ServiceProviderOptions from "../chatWidgets/ServiceProviderOptions";
import FindService from "../chatWidgets/FindServices";
import ServiceHistory from "../chatWidgets/ServiceHistory";
import ServiceUpcomingHistory from "../chatWidgets/ServiceUpcomingHistory";
import SelectedService from "../chatWidgets/SelectedService";
import PostAReviewForService from "../chatWidgets/PostAreviewForService";
import AddReviewForService from "../chatWidgets/AddreviewForService";
const config = {
  initialMessages: [createChatBotMessage(`Hello there!`)],
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
    {
      widgetName: "serviceHistoryList",
      widgetFunc: (props) => <ServiceHistory {...props} />,
      mapStateToProps: ["serviceHistoryList"],
    },
    {
      widgetName: "serviceUpcomingList",
      widgetFunc: (props) => <ServiceUpcomingHistory {...props} />,
      mapStateToProps: ["serviceUpcomingList"],
    },
    {
      widgetName: "serviceDetail",
      widgetFunc: (props) => <SelectedService {...props} />,
      mapStateToProps: ["serviceDetail"],
    },
    {
      widgetName: "serviceReview",
      widgetFunc: (props) => <PostAReviewForService {...props} />,
      mapStateToProps: ["serviceReview", "serviceDetail"],
    },
    {
      widgetName: "addReview",
      widgetFunc: (props) => <AddReviewForService {...props} />,
      mapStateToProps: ["addReview", "serviceDetail"],
    },
  ],
  state: {
    options: [
      "Find a Service",
      "Chat with Service Provider",
      "Post a review",
      "Service History",
      "Upcoming Services",
    ],
    serviceProvidersList: [],
    serviceHistoryList: [],
    serviceUpcomingList: [],
    serviceDetail: [],
    serviceReview: [],
    addReview: "",
  },
};

export default config;
