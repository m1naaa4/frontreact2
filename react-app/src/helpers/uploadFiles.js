import React, { useState, useEffect, useRef } from "react";
import UploadService from "./FileUploadService";

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const progressInfosRef = useRef(null)

//   useEffect(() => {
//     UploadService.getFiles().then((response) => {
//       setFileInfos(response.data);
//     });
//   }, []);

  const selectFiles = (event) => {
    setSelectedFiles(event.target.files);
    setProgressInfos({ val: [] });
  };

  const upload = (idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];
    return UploadService.upload(file, (event) => {
      _progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      setProgressInfos({ val: _progressInfos });
    })
      .then(() => {
        setMessage((prevMessage) => ([
          ...prevMessage,
          "Uploaded the file successfully: " + file.name,
        ]));
      })
      .catch(() => {
        _progressInfos[idx].percentage = 0;
        setProgressInfos({ val: _progressInfos });

        setMessage((prevMessage) => ([
          ...prevMessage,
          "Could not upload the file: " + file.name,
        ]));
      });
  };

  const uploadFiles = () => {
    const files = Array.from(selectedFiles);

    let _progressInfos = files.map(file => ({ percentage: 0, fileName: file.name }));

    progressInfosRef.current = {
      val: _progressInfos,
    }

    const uploadPromises = files.map((file, i) => upload(i, file));

    Promise.all(uploadPromises)
    //   .then(() => UploadService.getFiles())
      .then((files) => {
        setFileInfos(files.data);
      });

    setMessage([]);
  };

  return (
    <div>
      {progressInfos && progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressInfo.percentage + "%" }}
              >
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))}

        
        <label htmlFor="file-upload"
            className="custom-file-upload"
        >
            <i className="uil-upload-alt"></i>
        </label>
        <input
            onChange={selectFiles}
            multiple
            id="file-upload"
            type="file"
        />
        <h3>Select video files to upload</h3>
        <span>or drag &amp; drop video files</span>

      <div className="row my-3">
       
        

        
      </div>

      {/* {message.length > 0 && (
        <div className="alert alert-secondary" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )} */}

      <div style={{marginTop:"42px"}}>
        <div className="youtube-dwn">
        <button
            style={{backgroundColor:"#00CC66", borderRadius: "30px", color: "#FFFFFF", padding:"0 110px", height:"35px", border:0}}
            disabled={!selectedFiles}
            onClick={uploadFiles}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFiles;
