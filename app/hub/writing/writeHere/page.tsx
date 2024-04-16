"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useEffect, useState } from "react";
import { S3 } from "aws-sdk";
import axios from "axios";
import { postWriting } from "@/actions/actions";
import {
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import styles from "./writeHere.module.css";

const WriteHere = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [writing, setWriting] = useState<string>();
useEffect(() => {
 console.log(selectedImage)
}, [selectedImage])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files ? e.target.files[0] : null;
    setSelectedImage(imageFile);
  };

  let wordCountFirst = 0;
  if (writing) {
    wordCountFirst = writing.trim().split(/\s+/).length;
  }

  const formInput =
    "bg-[#c6d9e6] text-lightText px-2 py-2 rounded-md outline-none";
  return (
    <div>
      <Card className="w-[20rem] sm:w-[25rem] md:w-[40rem] lg:w-[50rem] p-4 bg-extraText text-lightPrime mx-auto">
        <form action={postWriting} className="space-y-6 flex flex-col">
          <p className="h3 text-center">
            Here you can write and send your first section writing
          </p>

          <TextField
          required
            classes={{
              root: styles.textFieldRoot,
            }}
            label="Name"
            name="name"
            placeholder="Write your name here..."
          />
       
          <TextField
          required
            classes={{
              root: styles.textFieldRoot,
            }}
            label="Teacher ID"
            name="teacherId"
            placeholder="Write your name here..."
          />
       
         
          <TextField
          required
            label="Subject"
            name="subject"
            placeholder="Write your subject here..."
          />
          <TextField
            id="writingImg"
            type="file"
            name="image"
            sx={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="writingImg" className={styles.imgLabel}>
            {`Choosed => ${selectedImage?.name || "Not chosen yet :)"}`}
          </label>

          <TextField
          required
            multiline
            label="Writing"
            placeholder="Write your writing..."
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            name="writing"
          />
          <p className="text-white">{wordCountFirst} / 250</p>

          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default WriteHere;
