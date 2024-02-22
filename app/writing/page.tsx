import React from "react";
import styles from "./writing.module.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  TextField,
  styled,
} from "@mui/material";
import { currentUser } from "@clerk/nextjs";
import CustomWritingTextField from "@/components/reactQuill/CustomWritingTextField";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HiddenInput from "@/components/reusableComponents/HiddenInput";
import Image from "next/image";

const WritingPage = async () => {
  // RETRIEVE USER
  const user = await currentUser();
  console.log(user);
  return (
    <div className={styles.container}>
      <h1 style={{ marginTop: "1em" }}>Writing Section</h1>
      <p>
        Welcome to the writing center. Here you can upload your writing file,
        write your writing here directly or even share with other learners
      </p>
      <div className={styles.submitWritingSection}>
        <div className={styles.writeWriting}>
          <FormControl>
            <TextField
              placeholder="Write down your name..."
              label="Your name"
              variant="outlined"
              defaultValue={user?.firstName}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "1px solid #81403e",
                    borderRadius: "5px",
                  },
                },
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              label="Your email"
              placeholder="Write down your email..."
              variant="outlined"
              defaultValue={user?.emailAddresses[0].emailAddress}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "1px solid #81403e",
                    borderRadius: "5px",
                  },
                },
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              label="Your subject"
              placeholder="Write down your subject..."
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "1px solid #81403e",
                    borderRadius: "5px",
                  },
                },
              }}
            />
          </FormControl>
          <CustomWritingTextField />
        </div>
        <div className={styles.uploadWriting}>
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<UploadFileIcon />}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              borderColor: "#81403e",
              color: "#81403e",
              marginBottom: "1em",
              "&:hover": {
                borderColor: "#b06b69",
                color: "#b06b69",
              },
            }}
          >
            Upload Your Writing File
            <HiddenInput />
          </Button>

          <div className={styles.writingsStatus}>
            {/* EACH WRITING STATUS */}
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <p>Subject 1 -</p>
              <Image
                className={styles.inProgressStatus}
                src={"/yellowCircle.png"}
                alt="In progress status"
                width={10}
                height={10}
              />
            </div>

            {/* EACH WRITING STATUS */}
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <p>Subject 2 -</p>
              <Image
                className={styles.checkedStatus}
                src={"/greenCircle.png"}
                alt="In progress status"
                width={10}
                height={10}
              />
            </div>
          </div>
        </div>
      </div>
      <Divider sx={{ margin: "1em 0" }} />
      <div className={styles.templates}>
        {/* EACH CARD */}
        <Card className={styles.eachTemplateCard}>
          <CardContent
            className={styles.cardContent}
            sx={{ flex: "1 0 auto", textAlign: "right" }}
          >
            <Chip label="words" />
            <h4 style={{ fontSize: "30px" }}>This is title of writing</h4>
            <p>Write by: a writer</p>
          </CardContent>

          <CardMedia
            component="img"
            sx={{ width: "50px", flex: 1 }}
            image="/writingTemplate.jpg"
            alt="Live from space album cover"
          />
        </Card>

        {/* EACH CARD */}
        <Card className={styles.eachTemplateCard}>
          <CardContent
            className={styles.cardContent}
            sx={{ flex: "1 0 auto", textAlign: "left" }}
          >
            <Chip label="words" />
            <h4>This is title of writing</h4>
            <p>Write by: a writer</p>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: "50px", flex: 1 }}
            image="/writingTemplate.jpg"
            alt="Live from space album cover"
          />
        </Card>
      </div>
    </div>
  );
};

export default WritingPage;
