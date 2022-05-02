// ActionProvider starter code
class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  helloHandler = () => {
    const message = this.createChatBotMessage("How may I help you?", {
      widget: "chatOptions",
    });
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  findServicesHandler = () => {
    const message = this.createChatBotMessage(
      "Here's the list of service provider near to your location",
      {
        widget: "serviceProviderList",
      }
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  serviceHistoryHandler = () => {
    const message = this.createChatBotMessage(
      "Here's the list of your past services",
      {
        widget: "serviceHistoryList",
      }
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  serviceUpcomingHandler = () => {
    const message = this.createChatBotMessage(
      "Here's the list of your upcoming services",
      {
        widget: "serviceUpcomingList",
      }
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  serviceDetailHandler = () => {
    const message = this.createChatBotMessage(
      "Here's the list of your upcoming services",
      {
        widget: "serviceDetail",
      }
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  postReviewHandler = () => {
    const message = this.createChatBotMessage("Please select service", {
      widget: "serviceReview",
    });
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  addReviewHandler = () => {
    const message = this.createChatBotMessage("Please add a review", {
      widget: "addReview",
    });
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  setChatBotMessage = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
}
export default ActionProvider;
