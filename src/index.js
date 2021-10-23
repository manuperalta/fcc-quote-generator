import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { quotes } from "./quotes.js";
import { colors } from "./colors.js";

var getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

var getRandomQuote = (quotes, colors) => {
  let randAuth = getRandomInt(0, quotes.length);
  let randQuote = getRandomInt(0, quotes[randAuth].quo.length);
  let randColor = getRandomInt(0, colors.length);
  return {
    author: quotes[randAuth].author,
    quote: quotes[randAuth].quo[randQuote],
    color: colors[randColor],
    port: quotes[randAuth].port
  };
};
const firstQuote = getRandomQuote(quotes, colors);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = firstQuote;
    this.handleClick = this.handleClick.bind(this);
    this.colorTrans = this.colorTrans.bind(this);
  }

  handleClick = () => {
    let randAuth = getRandomInt(0, quotes.length);
    let randQuote = getRandomInt(0, quotes[randAuth].quo.length);
    let randColor = getRandomInt(0, colors.length);
    this.setState({
      author: quotes[randAuth].author,
      quote: quotes[randAuth].quo[randQuote],
      prevColor: this.props.color,
      color: colors[randColor],
      port: quotes[randAuth].port
    });
  };
  colorTrans = (prevColor, color) => ({
    backgroundColor: false ? prevColor : color,
    color: false ? prevColor : color,
    transition: "all .5s ease"
  });

  render() {
    return (
      <Quote
        {...this.state}
        getRandomInt={getRandomInt}
        handleClick={this.handleClick}
        colorTrans={this.colorTrans}
      />
    );
  }
}

class Quote extends React.Component {
  render() {
    return (
      <div
        id="wrapper"
        style={this.props.colorTrans(this.props.prevColor, this.props.color)}
      >
        <div
          id="quote-box"
          style={{
            color: false ? this.props.prevColor : this.props.color,
            transition: "all .5s ease"
          }}
        >
          <h4 id="text">{'"' + this.props.quote + '"'}</h4>
          <p id="author">{"- " + this.props.author}</p>
          <button
            id="new-quote"
            className="btn"
            style={{ backgroundColor: this.props.color }}
            onClick={this.props.handleClick}
          >
            New Quote
          </button>
          <a
            id="tweet-quote"
            href={
              "twitter.com/intent/tweet?text=" +
              '"' +
              this.props.quote +
              '"' +
              " " +
              "-" +
              this.props.author
            }
            target="_blank"
            rel="noreferrer"
          >
            Tweet
          </a>
        </div>
        <div id="portrait">
          <img id="photo" src={this.props.port} alt="" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
