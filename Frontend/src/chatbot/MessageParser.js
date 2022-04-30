class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const msg = message.toLowerCase();
    if (msg.includes("hi") || msg.includes("helloo")) {
      this.actionProvider.helloHandler();
    }
  }
}
export default MessageParser;
