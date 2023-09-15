import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";

export default function FileUploader() {
  var wordsMap = new Map();

  var [words, setwords] = useState(wordsMap);
  var [wordsCount, setwordsCount] = useState(0);


  function HandleWordsValues(splittedText)
  {
    for (var i = 0; i < splittedText.length; i++) {

      var wordItemNum = wordsMap.get(splittedText[i]);
      if (wordItemNum === undefined) {
        wordsMap.set(splittedText[i], 1);
      }
       else {
        wordsMap.set(splittedText[i], wordItemNum + 1);
      }
    }
    setwordsCount(splittedText.length);

    setwords(wordsMap);
  }

  function handleFile(e) {
    e.preventDefault();

    if (e.target.files[0].type === "text/plain") {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text = e.target.result;

          console.log("text " + text);

          var splittedText = text.split(" ");

          HandleWordsValues(splittedText)          
        };

        reader.readAsText(e.target.files[0]);
        console.log(e.target.files[0]);
        toast.success("Uploaded successfully");

      } catch (error) {
        toast.error("Issue happened while uploading");

        console.error(error);
      }
    } else {
      toast.error("File type not supported");
    }
  }

  return (
    <div className="form-control">
      <ToastContainer />
      <div className="form-row">
        <div className="form-group col-md-6">
          <label className="text-white">Select File :</label>
          <input
            type="file"
            className="form-control"
            name="upload_file"
            onChange={handleFile}
          />
        </div>
      </div>
      <br />
      <div>
        <h2>Number of words = {wordsCount}</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td scope="col"> Word </td>
              <td scope="col"> Number Of Occurence </td>
            </tr>
          </thead>
          <tbody>

            {[...words].map((value, key) =>

              <tr key={key} scope="row">
                <td>{value[0]}</td>
                <td>{value[1]}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
