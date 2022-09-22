import React, {useState} from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export default function ShowProjectDocs() {
  const [selectedDoc, setSelectedDoc] = useState("")

  return (
    <div className="row">
      <div className="col-12">
        <button onClick={()=>{setSelectedDoc(require("./pdf.pdf"))}}>PDF</button>
        <button onClick={()=>{setSelectedDoc(require("./pptx.pptx"))}}>PPT</button>
        <button onClick={()=>{setSelectedDoc(require("./docx.docx"))}}>DOC</button>
        <button onClick={()=>{setSelectedDoc(require("./txt.txt"))}}>TXT</button>
      </div>
      <DocViewer className="col-12" pluginRenderers={DocViewerRenderers} documents={[{ uri: selectedDoc }]} />
    </div>
  );
}