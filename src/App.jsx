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
      username: '',
      oldusername: '',
      firstmessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.update = this.update.bind(this);
    this.updateUser = this.update.bind(this);
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
      console.log('message here');
      let data = JSON.parse(event.data);
      console.log(data);
      switch(data.type) {
        case "incomingMessage":
          this.state.message.push({
            id: data.id,
            username: data.username ,
            content: data.content
          });
          break;
        case "incomingNotification":
          this.state.message.push({
            id: data.id,
            username: "",
            content: `${data.oldusername} has change their name to ${data.username}!`
          })
          // this.state.message.push({
          //   id: data.id,
          //   username: data.username ,
          //   content: data.content
          // });
          // this.setState({
          //   value: "",
          //   oldusername: data.username
          // })
          break;
        default:

          throw new Error("Unknown event type " + data.type);
      }
      this.forceUpdate()
    }.bind(this)
  }


  update() {
    console.log(this.state.username)
    console.log(this.state.oldusername)
    console.log("update");
    if(this.state.username == this.state.oldusername || this.state.firstmessage === false){
      this.socket.send(JSON.stringify({
        type: "incomingMessage",
        id: uuid.v4(),
        username: this.state.username,
        oldusername: this.state.oldusername,
        content: this.state.value
      }));
      this.setState({
        value: "",
        oldusername: this.state.username,
        firstmessage: true
      })
      // this.state.firstmessage = true;
    } else {
      this.socket.send(JSON.stringify({
        type: "incomingNotification",
        id: uuid.v4(),
        username: this.state.username,
        oldusername: this.state.oldusername,
      }));
      this.socket.send(JSON.stringify({
        type: "incomingMessage",
        id: uuid.v4(),
        username: this.state.username,
        oldusername: this.state.oldusername,
        content: this.state.value
      }));
    }
  }
  updateUser() {
    console.log(this.socket)
    this.socket.send(JSON.stringify({
      type: "incomingNotification",
      id: uuid.v4(),
      username: this.state.username,
      oldusername: this.state.oldusername
    }));
  }
  render() {
    console.log("Rendering <App/>");
    let valueLink = {
      value: this.state.value,
      requestChange: this.handleChange,
      update: this.update,
      username: this.state.username,
      userChange: this.handleUser,
      updateUser: this.updateUser
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
