"use client";

import React, { useState, KeyboardEvent, Dispatch, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { createTeacherProfile } from "@/actions/userActions";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import TextEditor from "../TextEditor";
import { getOneTeacherProfile } from "@/actions/teachers";
type TeacherProfileProps = {
  setOpenCreateTeacherProfile: Dispatch<React.SetStateAction<boolean>>;
  teacherId: string;
};
export default function CreateTeacherProfile({
  teacherId,
  setOpenCreateTeacherProfile,
}: TeacherProfileProps) {
  const [description, setDescription] = useState("");
  const [persianDescription, setpersianDescription] = useState("");

  const [bio, setBio] = useState("");
  const [persianBio, setPersianBio] = useState("");
  const [createProfileLoading, setCreateProfileLoading] = useState(false);
  const [teacherProfileLoading, setTeacherProfileLoading] = useState(false);
  useEffect(() => {
    const fetchTeacerProfile = async () => {
      setTeacherProfileLoading(true);
      const teacherProfile = await getOneTeacherProfile(teacherId);
      if (teacherProfile) {
        setDescription(teacherProfile.description);
        setBio(teacherProfile.bio);
      }
      setTeacherProfileLoading(false);
    };
    fetchTeacerProfile();
  }, []);

  const handleCreateTeacherProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setCreateProfileLoading(true);
    const data = new FormData();
    data.set("bio", bio);
    data.set("description", description);
    data.set("persianDescription", persianDescription);
    data.set("persianBio", persianBio);
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

  if (!teacherProfileLoading) {
    return (
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md h-[70vh] overflow-y-scroll">
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
            <Label htmlFor="persianBio">Persian Bio</Label>
            <Textarea
              className="resize-none"
              id="persianBio"
              value={persianBio}
              onChange={(e) => setPersianBio(e.target.value)}
              placeholder="Enter teacher's bio"
            />
          </div>
          <div>
            <Label>English Description</Label>

            <TextEditor
              textEditorContent={description}
              setTextEditorContent={setDescription}
            />
          </div>
          <div>
            <Label>Persian Description</Label>

            <TextEditor
              textEditorContent={persianDescription}
              setTextEditorContent={setpersianDescription}
            />
          </div>

          <Button type="submit" className="w-full">
            {createProfileLoading ? <CircularProgress /> : "Create Profile"}
          </Button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    );
  }
}
