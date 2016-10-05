var uuid = require('node-uuid');
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      value: '',
      idvalue: '',
      username: '',
      oldusername: '',
      firstmessage: false,
      loggedIn: '',
      image: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.update = this.update.bind(this);
    this.updateUser = this.updateUser.bind(this);
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
    console.log("componentDidMount <App />");
    this.socket.onopen = function(event) {
      console.log('Connected to server')
    }
    this.socket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      console.log(data);
      console.log(data.image)
      switch(data.type) {
        case "incomingMessage":
          this.state.message.push({
            id: data.id,
            username: data.username ,
            content: data.content,
            image: data.image,
            color: data.color
          });
          break;
        case "incomingNotification":
          this.state.message.push({
            id: uuid.v4(),
            username: "",
            content: `${data.oldusername} has change their name to ${data.username}!`
          })
          break;
        case "userCount":
          this.setState({
            loggedIn: data.users
          })
          break;
        case "userLeaves":
          this.state.message.push({
            id: uuid.v4(),
            username: data.username,
            content: ` has left!`
          })
          this.setState({
            loggedIn: data.users
          })
          break;
        default:

          throw new Error("Unknown event type " + data.type);
      }
      this.forceUpdate()
    }.bind(this)
  }
  componentWillUnmount () {
    this.socket.close();
  }

  update() {
    console.log(this.state.username)
    console.log(this.state.oldusername)
    console.log("update");
    if(this.state.username == this.state.oldusername){
      this.socket.send(JSON.stringify({
        type: "incomingMessage",
        id: uuid.v4(),
        username: this.state.username || "NoName!",
        oldusername: this.state.oldusername,
        content: this.state.value
      }));
      this.setState({
        value: "",
        oldusername: this.state.username,
        firstmessage: true
      })
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

      this.setState({
        value: "",
        oldusername: this.state.username,
        firstmessage: true
      })
    }
  }
  updateUser() {

    console.log("update user was run")
    this.socket.send(JSON.stringify({
      type: "incomingNotification",
      id: uuid.v4(),
      username: this.state.username,
      oldusername: this.state.oldusername
    }));
  }
  render() {
    console.log("Rendering <App/>");
    // let valueLink = {
    //   value: this.state.value,
    //   requestChange: this.handleChange,
    //   update: this.update,
    //   username: this.state.username,
    //   userChange: this.handleUser,
    //   updateUser: this.updateUser
    // };
    return (
      <div className="wrapper">
        <nav>
          <h1>Talk!</h1>
          <div className="usercount">{this.state.loggedIn}: Logged in</div>
        </nav>
        <MessageList messages={this.state.message}/>
        <ChatBar
          value={this.state.value}
          requestChange={this.handleChange}
          update={this.update}
          username={this.state.username}
          userChange={this.handleUser}
          updateUser={this.updateUser}
        />
      </div>
    );
  }
}
export default App;
