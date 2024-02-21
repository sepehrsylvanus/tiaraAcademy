"use client";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import styles from "./writingField.module.css";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
const CustomWritingTextField = () => {
  const [value, setValue] = useState("");

  return (
    <div className={styles.container}>
      <ReactQuill
        theme="bubble"
        value={value}
        onChange={setValue}
        placeholder="Write your writing..."
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#81403e",
            borderRadius: 0,

            "&:hover": {
              backgroundColor: "#b06b69",
            },
          }}
          variant="contained"
        >
          Send
        </Button>
        <p style={{ display: "flex", alignItems: "center", gap: ".5em" }}>
          Words count: <span>{value ? value.split(" ").length : 0}</span> / 250{" "}
          {value.split(" ").length >= 250 && (
            <CheckIcon sx={{ color: "#55efc4" }} />
          )}
        </p>
      </div>
    </div>
  );
};

export default CustomWritingTextField;
