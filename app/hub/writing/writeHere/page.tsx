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
    console.log(selectedImage);
  }, [selectedImage]);

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

          <input
            required
            className="formInput w-full py-4"
            name="name"
            placeholder="Write your name here..."
          />

          <input
            required
            className="formInput w-full py-4"
            name="teacherId"
            placeholder="Write your name here..."
          />

          <input
            required
            className="formInput w-full py-4"
            name="subject"
            placeholder="Write your subject here..."
          />
          <input
            id="writingImg"
            type="file"
            name="image"
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept=".jpg, .jpeg, .png"
          />
          <label htmlFor="writingImg" className="formInput w-full py-4">
            {selectedImage?.name && "Choosed => "}
            {` ${selectedImage?.name || "Not chosen yet :)"}`}
          </label>

          <textarea
            required
            rows={5}
            className="formInput w-full py-4 resize-none"
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
