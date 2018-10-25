import React, { Component } from 'react';

import '../less/MessageForm.less';

class MessageForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(message) {
        const { conversation, newConversation } = this.props;

        if (newConversation) {
            if (newConversation.get('broadcast')) {
                this.props.startNewBrodcastGroup(message);
            } else {
                this.props.startNewConversation(message);
            }
        } else {
            if (conversation.get('broadcast')) {
                this.props.sendMessageToBroadcastGroup(message);
            } else {
                this.props.sendMessage(message);
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const message = event.target.content.value;
        this.sendMessage(message);
        event.target.content.value = "";
    }

    render() {
        return (
            <div className="message-form-wrap">
                <form className="" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-8">
                            <textarea rows="2" name="content" placeholder="Skriv ett meddelande…" />
                        </div>
                        <div className="col-md-4">
                            <input type="submit" className="btn btn-primary btn-filled btn-block" value="Skicka" disabled={this.props.disabled} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default MessageForm;
