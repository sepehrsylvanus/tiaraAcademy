"use client";
import React, { useEffect, useState, FC } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/font_size.min.js";

interface TextEditorProps {
  textEditorContent: string;
  setTextEditorContent: React.Dispatch<React.SetStateAction<string>>;
}
const TextEditor: FC<TextEditorProps> = ({
  textEditorContent,
  setTextEditorContent,
}) => {
  return (
    <FroalaEditor
      model={textEditorContent}
      onModelChange={(e: string) => setTextEditorContent(e)}
      tag="textarea"
      config={{
        placeholderText: "Type your explenation heere",
      }}
    />
  );
};

export default TextEditor;
