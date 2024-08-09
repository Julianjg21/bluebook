import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEdit() {
  const [value, setValue] = useState("");

  const handleImageResize = (e) => {
    const editor = document.querySelector('.ql-editor');
    
    // Encuentra todas las imágenes insertadas
    const images = editor.querySelectorAll('img');
    
    images.forEach(img => {
      // Si la imagen aún no tiene la clase, se agrega
      if (!img.classList.contains('small-image')) {
        img.classList.add('small-image');
        img.addEventListener('click', () => {
          img.classList.toggle('small-image');
          img.classList.toggle('large-image');
        });
      }
    });
  };

  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(content, delta, source, editor) => {
          setValue(content);
          handleImageResize();
        }}
        modules={TextEdit.modules}
        formats={TextEdit.formats}
      />
    </div>
  );
}

/* 
 * Quill modules to attach to editor
 */
TextEdit.modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'color': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'] // Agregamos la opción para imágenes
  ]
};

/* 
 * Quill editor formats
 */
TextEdit.formats = [
  'header', 
  'bold', 
  'italic', 
  'underline', 
  'color',
  'list', 
  'bullet', 
  'link', 
  'image'
];

export default TextEdit;
