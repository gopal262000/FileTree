import React, { useState } from "react";

import "./NewFile.css";

const NewFile = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    fileType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
    };

    if (updatedFormData.fileType === "folder") updatedFormData.children = [];
    updatedFormData.key = crypto.randomUUID();
    delete updatedFormData.formType;
    onSubmit({ ...updatedFormData });

    setFormData({ title: "", fileType: "" });
  };

  return (
    <div>
      <h2>Add New File</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Name</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the File name"
            required
          />
        </div>
        <div className="form-group">
          <label>File Type</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="fileType"
                value="file"
                checked={formData.fileType === "file"}
                onChange={handleChange}
                required
              />
              File
            </label>
            <label>
              <input
                type="radio"
                name="fileType"
                value="folder"
                checked={formData.fileType === "folder"}
                onChange={handleChange}
                required
              />
              Folder
            </label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewFile;
