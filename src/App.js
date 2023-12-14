// import "./App.css";
// import ImageUploader from "./ImageUploader";

// function App() {
//   return (
//     <div className="App">
//       {/* uplodaer */}
//       <ImageUploader />
//     </div>
//   );
// }

// export default App;
// App.js

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* uploader */}
        <ImageUploader />
      </div>
    </Router>
  );
}

export default App;
