"use client";
import { useState } from "react";
import ReactQuill from "react-quill";

const CreateArticle = () => {
  const [value, setValue] = useState("");
  return (
    <form>
      <input className="border rounded-md" type="text" name="title" />
      <ReactQuill
        className="border mt-2 rounded-md"
        theme="bubble"
        value={value}
        onChange={setValue}
        placeholder="Write your writing..."
      />
    </form>
  );
};

export default CreateArticle;
