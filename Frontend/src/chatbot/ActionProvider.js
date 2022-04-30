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
    const message = this.createChatBotMessage("How may I help you!");
    this.setChatBotMessage(message);
  };
  setChatBotMessage = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
}
export default ActionProvider;
