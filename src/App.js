import { useState } from "react";
function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponse(data.bot);
      });
  };
  console.log(message);
  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <textarea
          className="border-2 border-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit" className="border-2">
          Submit
        </button>
      </form>
      <div>{response}</div>
    </div>
  );
}
export default App;
