import React from 'React'
import ReactDOM from 'react-dom'


var FlipperMain = React.createClass({
    getInitialState: function() {
        return {
            flipped: false
        };
    },

    flip: function() {
        this.setState({ flipped: !this.state.flipped });
    },

    render: function() {
        return <div>
        	<h2>Flipper</h2>
            <Flipper flipped={this.state.flipped} orientation="horizontal" />
            <Flipper flipped={this.state.flipped} orientation="vertical" />

            <div className="button-container">
                <button onClick={this.flip}>Flip!</button>
            </div>
        </div>;
    }
});

var Flipper = React.createClass({
    render: function() {
        return <div className={"flipper-container " + this.props.orientation}>
            <div className={"flipper" + (this.props.flipped ? " flipped" : "")}>
                <Front>the front!</Front>
                <Back>the back!</Back>
            </div>
        </div>;
    }
});

var Front = React.createClass({
    render: function() {
        return <div className="front tile">{this.props.children}</div>;
    }
});

var Back = React.createClass({
    render: function() {
        return <div className="back tile">{this.props.children}</div>;
    }
});

ReactDOM.render(<FlipperMain />, document.getElementById('flipper'));