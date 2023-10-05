import React, { useState } from "react";
import { debounce } from "throttle-debounce";
import "./App.css";

// wyciągnąć tytul do img alt

const SEARCH_URL = `https://api.giphy.com/v1/gifs/search?type=gifs&limit=10&api_key=Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g&q=`;

function App() {
  const [gif, setGif] = useState(null);
  const [imageTitle, setImageTitle] = useState("");

  imageTitle;
  async function fetchResponse(searchQuery: string) {
    try {
      const response = await fetch(`${SEARCH_URL}${searchQuery}`);

      if (response.ok) {
        const responseData = await response.json();
        const randomDataIndex = Math.floor(Math.random() * 10);

        const gifUrl =
          responseData.data[randomDataIndex].images.downsized_large.url;

        const altTitle = responseData.data[randomDataIndex].alt_text;

        if (gif === gifUrl) return fetchResponse(searchQuery);

        setGif(gifUrl);
        setImageTitle(altTitle);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("gif");

    if (searchQuery) {
      fetchResponse(searchQuery.toString());
    }
  };

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value;

    fetchResponse(searchQuery);
  }

  const debounceHandleQueryChange = debounce(1000, handleQueryChange);

  return (
    <>
      <h1 className="title">gif searcher</h1>
      <form onSubmit={handleSubmit} className="gif-form">
        <input
          className="gif-input"
          onChange={debounceHandleQueryChange}
          type="search"
          name="gif"
          id="gif"
          placeholder="Search a GIF..."
        ></input>

        <button type="reset" className="gif-button"></button>
      </form>
      {gif && <img src={gif} alt={imageTitle} />}
    </>
  );
}

export default App;
