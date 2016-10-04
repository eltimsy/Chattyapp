var uuid = require('node-uuid');
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      value: '',
      idvalue: '',
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.update = this.update.bind(this);
    this.socket = '';

  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleUser(event) {
    this.setState({username: event.target.value});
  }

  componentDidMount() {
    let connection = new WebSocket('ws://localhost:4000');
    this.socket = connection;
    console.log(this.socket)
    console.log("componentDidMount <App />");
    this.socket.onopen = function(event) {
      console.log('Connected to server')
    }
    this.socket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      this.state.message.push({id:data.id,  username:data.username , content: data.content});
      this.setState({value: ""})
      this.forceUpdate()
    }.bind(this)
  }


  update() {
    console.log("update");
    this.socket.send(JSON.stringify({
      id: uuid.v4(),
      username: this.state.username,
      content: this.state.value
    }));
    // this.state.message.messages.push({id: uuid.v4(), username: this.state.username, content: this.state.value});
    // this.setState({message: this.state.message})
    // this.setState({value: ""})
    // this.state.idvalue += 1;
  }
  render() {
    console.log("Rendering <App/>");
    let valueLink = {
      value: this.state.value,
      requestChange: this.handleChange,
      update: this.update,
      username: this.state.username,
      userChange: this.handleUser
    };
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.message}/>
        <ChatBar text={valueLink}/>
      </div>
    );
  }
}
export default App;
