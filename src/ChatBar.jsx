import React, {Component} from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
  }
  handleUserChange(e) {
    e.preventDefault();
    if(e.key=== "Enter"){
      this.props.text.updateUser()
    }
  }
  handleKeyPress(e) {
    e.preventDefault();
    if(e.key=== "Enter"){
      this.props.text.update()
    }
  }
  render() {
    console.log("Rendering <ChatBar/>");
    console.log(this.props.text.value)
    return (
      <footer>
        <input
        id="username"
        type="text"
        placeholder="Your Name (Optional)"
        value={this.props.text.username}
        onChange={this.props.text.userChange}
        onKeyUp={this.handleUserChange.bind(this)}
         />
        <input
        id="new-message"
        type="text"
        placeholder="Type a message and hit ENTER"
        value={this.props.text.value}
        onChange={this.props.text.requestChange}
        onKeyUp={this.handleKeyPress.bind(this)}
         />
      </footer>
    );
  }
}
// ChatBar.propTypes = {
//
// }
export default ChatBar;
