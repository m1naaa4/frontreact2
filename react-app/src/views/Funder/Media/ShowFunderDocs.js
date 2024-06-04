import React, { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import Modal from '@mui/material/Modal';
import { useSelector } from "react-redux";
import NoContent from "../../../utils/NoContent";


export default function ShowFunderDocs() {
  const [selectedDoc, setSelectedDoc] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = (doc) => {
    setSelectedDoc(doc.uri);
    setOpen(true)
  }
  const handleClose = () => setOpen(false);

  const project = useSelector(state => state.funders.funder);

  const [files, setFiles] =  useState([]);

  useEffect (() => {
    if (project) { 
      const links = (Array.isArray(project.media)? project.media : [project?.media]).map((item) => { 
        if (/\.(doc|docx|xls|xlsx|ppt|pptx|csv|pdf)$/i.test(item)) {          
            let data = {
              type: getFileExtension(item),
              uri: item,
              name: getFileName(item)
            }
            return data;
          
        }
        return null;
      }).filter(item => item !== null);

      setFiles(links);
      
    }
  }, [project]);

  function getFileExtension(filename) {
    var extension = filename.split('.').pop();
    return extension.toUpperCase();
  }

  function getFileName(filepath) {
    var startIndex = filepath.lastIndexOf("/") + 1;
    var endIndex = filepath.lastIndexOf(".");
    return filepath.substring(startIndex, endIndex);
  }

  return (
    <div>
      {
        files.length > 0 ? files.map((e, index) => (
          <div className="row">
          <div className="col-sm-6 col-md-3 mb-2 flex-wrap" onClick={() => { handleOpen(e) }} key={index + 1}>
            <div className="Doc-Wrap">
              <a href="#!">
                <div className="Doc-Icon"><span className="Doc-Type">{e.type}</span><i className="uil uil-file-alt"></i></div>
                <div className="Doc-Name"><i className="uil uil-paperclip"></i> {e.name}</div>
              </a>
            </div>
          </div>
          </div>
        )) : <NoContent/>
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ width: "80%", margin: "auto", padding: "2em 0" }}
      >
        <div>
          <DocViewer
            className="col-12"
            pluginRenderers={DocViewerRenderers}
            documents={[{ uri: selectedDoc }]}
            style={{height: "100%"}}
          />
        </div>
      </Modal>
    </div>
  );
}