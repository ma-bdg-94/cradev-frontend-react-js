import React, { Fragment, useRef, useState } from "react";
import { Button, Input } from "reactstrap";
import "./fileUploader.scss";

const FileUploader = ({ content, onChange, ...props }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = event => {
    setSelectedFile(event.target.files[0]);
  }  

  return (
    <div className="upload-btn-wrapper">
      <Button className="w-100 align-items-center" style={{ cursor: 'pointer' }}><span>{content}</span></Button>
      <input type="file" onChange={onChange} />
    </div>
  );
};

export default FileUploader;
