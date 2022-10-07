import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [path, setPath] = useState("");

  const pathGet = (obj, val) => {
    let path = "";
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        //Check if the object is nested
        if (typeof obj[key] === "object") {
          if ((path = pathGet(obj[key], val))) {
            path = key + "." + path;
            return path;
          }
        } else if (val.toLowerCase() === obj[key].toString().toLowerCase()) {
          //Since the object is not nested, we should return the value
          return key;
        }
      }
    }
    return path;
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    let newPath = pathGet(a, e.target.value);
    setPath(newPath);
  };

  return (
    <div className="App">
      <input
        className="search"
        placeholder="Enter search term"
        type="search"
        value={searchTerm}
        onChange={handleChange}
        autoFocus
      />

      {path && (
        <div className="result">
          The path to the searched value is:{" "}
          <span className="path">{path}</span>
        </div>
      )}
    </div>
  );
}

export default App;

const a = {
  user: {
    id: 1,
    name: {
      firstName: "James",
      lastName: "Ibori",
    },
    location: {
      city: "Ikoyi",
      state: "Lagos",
      address: "One expensive house like that",
    },
  },
};
