"use client";

import React, { useState, KeyboardEvent, Dispatch } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { createTeacherProfile } from "@/actions/userActions";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import TextEditor from "../TextEditor";
type TeacherProfileProps = {
  setOpenCreateTeacherProfile: Dispatch<React.SetStateAction<boolean>>;
  teacherId: string;
};
export default function CreateTeacherProfile({
  teacherId,
  setOpenCreateTeacherProfile,
}: TeacherProfileProps) {
  const [description, setDescription] = useState("");
  const [bio, setBio] = useState("");
  const [createProfileLoading, setCreateProfileLoading] = useState(false);
  const handleCreateTeacherProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setCreateProfileLoading(true);
    const data = new FormData();
    data.set("description", description);
    data.set("bio", bio);
    data.set("teacherId", teacherId);
    try {
      const createNewProfile = await createTeacherProfile(data);
      toast.success(createNewProfile);
      setCreateProfileLoading(false);
      setOpenCreateTeacherProfile(false);
    } catch (error: any) {
      console.log(error);

      setCreateProfileLoading(false);
      if (
        error.message === "There is already a profile for this teacher there!"
      ) {
        toast.error("There is already a profile for this teacher there!");
      } else {
        toast.error("There is an error in creating teacher's profile");
      }
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Profile</h2>
      <form className="space-y-4" onSubmit={handleCreateTeacherProfile}>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            className="resize-none"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter teacher's bio"
          />
        </div>
        <div>
          <Label htmlFor="name">Description</Label>

          <TextEditor
            textEditorContent={description}
            setTextEditorContent={setDescription}
          />
        </div>

        <Button type="submit" className="w-full">
          {createProfileLoading ? <CircularProgress /> : "Create Profile"}
        </Button>
      </form>
    </div>
  );
}
