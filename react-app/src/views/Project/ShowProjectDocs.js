import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import Modal from '@mui/material/Modal';


export default function ShowProjectDocs() {
  const [selectedDoc, setSelectedDoc] = useState("")
  const [open, setOpen] = useState(false)
  const handleOpen = (doc) => {
    setSelectedDoc(doc.uri)
    setOpen(true)
  }
  const handleClose = () => setOpen(false);

  const files = [
    {
      type: "PDF",
      uri: require("./pdf.pdf"),
      name: "file_name.pdf"
    },
    {
      type: "TXT",
      uri: require("./txt.txt"),
      name: "file_name.txt"
    },
    {
      type: "PDF",
      uri: require("./pdf.pdf"),
      name: "file_name.pdf"
    },
    {
      type: "TXT",
      uri: require("./txt.txt"),
      name: "file_name.txt"
    },
    {
      type: "PDF",
      uri: require("./pdf.pdf"),
      name: "file_name.pdf"
    },
    {
      type: "TXT",
      uri: require("./txt.txt"),
      name: "file_name.txt"
    },
  ]

  return (
    <div className="row">
      {
        files.map((e, index) => (
          <div className="col-sm-6 col-md-3 mb-2 flex-wrap" onClick={() => { handleOpen(e) }} key={index + 1}>
            <div className="Doc-Wrap">
              <a href="#!">
                <div className="Doc-Icon"><span className="Doc-Type">{e.type}</span><i className="uil uil-file-alt"></i></div>
                <div className="Doc-Name"><i className="uil uil-paperclip"></i> {e.name}</div>
              </a>
            </div>
          </div>
        ))
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ width: "80%", margin: "auto", padding: "2em 0" }}
      >
        <DocViewer
          className="col-12"
          pluginRenderers={DocViewerRenderers}
          documents={[{ uri: selectedDoc }]}
          style={{height: "100%"}}
        />
      </Modal>
    </div>
  );
}