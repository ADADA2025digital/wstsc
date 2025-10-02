import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./assets/Styles/Style.css";
import Home from "./Pages/Home";
import { EnrolmentFormProvider } from "./Context/EnrolmentFormContext";
import Enrolment from "./Pages/Entrolment";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/enrolment" 
              element={
                <EnrolmentFormProvider>
                  <Enrolment />
                </EnrolmentFormProvider>
              } 
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;