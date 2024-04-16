"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
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
            classes={{
              root: styles.textFieldRoot,
            }}
            label="Name"
            name="name"
            placeholder="Write your name here..."
          />
          <FormControl>
            <InputLabel htmlFor="component-simple">Name</InputLabel>
            <OutlinedInput id="component-simple" />
          </FormControl>
          <TextField
            label="Email"
            name="email"
            placeholder="Write you email here..."
          />
          <TextField
            label="Subject"
            name="subject"
            placeholder="Write your subject here..."
          />
          <TextField
            id="writingImg"
            type="file"
            name="image"
            sx={{ display: "none" }}
          />
          <label htmlFor="writingImg" className={styles.imgLabel}>
            Choose your Image
          </label>

          <TextField
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
