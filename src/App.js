import "./App.css";
import React, { useState, useEffect } from "react";
import { marked } from "marked";
import syntaxData from "./syntax.json";

function useLocalStorage(key, initialValue) {
  // here i make a custom hook to react with local storage         ___mostafakhidr-dev
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

const App = () => {
  const [code, setCode] = useLocalStorage("markdown", "## Hello"); // using the custom useLocalStorage hook                ___mostafakhidr-dev
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>');
  const [activeTab, setActiveTab] = useState("Editor");

  const openMD = () => {
    setActiveTab("Editor");
  };

  const openPreview = () => {
    // i removed and refactor some of the code like delete the hide state                  ___mostafakhidr-dev
    setActiveTab("Preview");
  };

  const openDocs = () => {
    setActiveTab("Docs");
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };
  const basicSyntax = syntaxData.basic_syntax; // there is problem with API link so i down load the JSON file instead         ___mostafakhidr-dev
  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button
            onClick={openMD}
            className={`btn ${activeTab === "Editor" ? "active" : ""}`}
          >
            MarkDown
          </button>
          <button
            onClick={openPreview}
            className={`btn ${activeTab === "Preview" ? "active" : ""}`}
          >
            Preview
          </button>
          <button
            onClick={openDocs}
            className={`btn ${activeTab === "Docs" ? "active" : ""}`}
          >
            Docs
          </button>
        </div>
        {activeTab === "Editor" && (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        )}
        {activeTab === "Preview" && (
          <div>
            <textarea readOnly value={compiled} />
          </div>
        )}
        {activeTab === "Docs" && (
          <div>
            <h2>Documentation</h2>
            <div className="syntax-container">
              {basicSyntax.map((syntax, index) => (
                <div key={index}>
                  <h2>{syntax.name}</h2>
                  <p>{syntax.description}</p>
                  <h3>Examples:</h3>
                  {syntax.examples.map(
                    (
                      example,
                      exampleIndex //   there is the content inside the new tap (Docs)          __MostafaKhidr-dev
                    ) => (
                      <div key={exampleIndex}>
                        <pre style={{ background: "#f0f0f0", padding: "10px" }}>
                          <code>{example.markdown}</code>
                        </pre>
                        <div style={{ background: "#f0f0f0", padding: "10px" }}>
                          <code>{example.html}</code>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
