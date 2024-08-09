import React, { useState, useCallback } from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css"; // Estilos del tema Snow de Quill
import { StarFillIcon } from '@primer/octicons-react'; // Importa un icono de Octicon

/*
 * Custom "star" icon for the toolbar using an Octicon
 */
const CustomButton = () => <span className="octicon"><StarFillIcon size={16} /></span>;

/*
 * Event handler to be attached using Quill toolbar module
 */
const insertStar = function () {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
};

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={(e) => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option selected />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select>
    <button className="ql-insertStar">
      <CustomButton />
    </button>
  </div>
);

/* 
 * Editor component with custom toolbar and content containers
 */
const TextEdit = ({ placeholder }) => {
  const [editorHtml, setEditorHtml] = useState("");

  const handleChange = useCallback((html) => {
    setEditorHtml(html);
  }, []);

  return (
    <div className="text-editor">
      <CustomToolbar />
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        placeholder={placeholder}
        modules={TextEdit.modules}
        formats={TextEdit.formats}
        theme={"snow"} // Usar el tema "snow"
      />
    </div>
  );
};

/* 
 * Quill modules to attach to editor
 */
TextEdit.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertStar: insertStar,
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

/* 
 * Quill editor formats
 */
TextEdit.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

/* 
 * PropType validation
 */
TextEdit.propTypes = {
  placeholder: PropTypes.string,
};

export default TextEdit;
