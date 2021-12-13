import "./styles.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { colors } from "./colors.js";

//API usage:
//Quotable: https://github.com/lukePeavey/quotable
//WikiMedia API: https://www.mediawiki.org/wiki/API:Main_page
function switchColors() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function App() {
  let [randomQuote, updateQuote] = useState("");
  let [author, updateAuthor] = useState("");
  let [thumbnailURL, setURL] = useState("");
  let [couldGetPicture, setPicture] = useState(true);
  let [currentColor, setColor] = useState("");

  async function getNewQuote() {
    fetch(
      "https://api.quotable.io/random?tags=technology|history|civil-rights|education|science|wisdom"
    )
      .then((response) => response.json())
      .then((data) => {
        updateQuote(data.content);
        updateAuthor(data.author);
        return { content: data.content, author: data.author };
      })
      .then((data) =>
        fetch(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${data.author}&format=json&prop=pageimages&piprop=original&origin=*`
        )
          .then((response) => response.json())
          .then((response) => {
            if (
              response.query.pages[
                Object.keys(response.query.pages)[0]
              ].hasOwnProperty("original")
            ) {
              setURL(
                response.query.pages[Object.keys(response.query.pages)[0]]
                  .original.source
              );
              setPicture(true);
            } else {
              setPicture(false);
            }
          })
      );
  }
  useEffect(() => {
    getNewQuote();
    setColor(switchColors());
  }, []);
  return (
    <div
      id="container"
      style={{ backgroundColor: currentColor, transition: "all .5s ease-in" }}
    >
      <div id="quote-box">
        <h4
          id="text"
          style={{ color: currentColor, transition: "all .5s ease-in" }}
        >
          {'"' + randomQuote + '"'}
        </h4>
        <p id="author" style={{ color: currentColor }}>{`-${author}`}</p>
        <button
          className="btn"
          id="new-quote"
          style={{ backgroundColor: currentColor }}
          onClick={() => {
            getNewQuote();
            setColor(switchColors());
          }}
        >
          New Quote
        </button>
      </div>
      <div id="portrait">
        {couldGetPicture ? (
          <img id="photo" alt="" src={thumbnailURL} />
        ) : (
          <h3 id="error-message">Could not get author's picture</h3>
        )}
      </div>
    </div>
  );
}
