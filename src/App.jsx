import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: "1",
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: "2",
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};
let idvalue = 4;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      value: '',
      idvalue: idvalue
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
  }
  handleChange(event) {
   this.setState({value: event.target.value});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      this.state.data.messages.push({id: 3, username: "Michelle", content: "Hello there!"});
      // Update the state of the app component. This will call render()
      this.setState({data: this.state.data})
    }, 3000);
  }

  update() {
    console.log("update");
    this.state.data.messages.push({id: this.state.idvalue, username: "Anon", content: this.state.value});
    this.setState({data: this.state.data})
    this.setState({value: ""})
    this.state.idvalue += 1;
  }


  // getInitialState() {
  //   return {data: data};
  // },
  render() {
    console.log("Rendering <App/>");
    let valueLink = {
      value: this.state.value,
      requestChange: this.handleChange,
      update: this.update
    };
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.data.messages}/>
        <ChatBar username={this.state.data.currentUser.name} text={valueLink}/>
      </div>
    );
  }
}
export default App;
