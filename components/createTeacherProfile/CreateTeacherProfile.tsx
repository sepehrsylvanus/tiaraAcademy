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
type TeacherProfileProps = {
  setOpenCreateTeacherProfile: Dispatch<React.SetStateAction<boolean>>;
  teacherId: string;
};
export default function CreateTeacherProfile({
  teacherId,
  setOpenCreateTeacherProfile,
}: TeacherProfileProps) {
  const [description, setDescription] = useState("");
  const [graduation, setGraduation] = useState("");
  const [experience, setExperience] = useState("");
  const [awards, setAwards] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [bio, setBio] = useState("");
  const [createProfileLoading, setCreateProfileLoading] = useState(false);
  const handleAddLanguage = () => {
    if (currentLanguage.trim() !== "") {
      setLanguages([...languages, currentLanguage.trim()]);
      setCurrentLanguage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddLanguage();
    }
  };

  const handleRemoveLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const handleCreateTeacherProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setCreateProfileLoading(true);
    const data = new FormData();
    data.set("description", description);
    data.set("bio", bio);
    data.set("graduation", graduation);
    data.set("experience", experience);
    data.set("awards", awards);
    data.set("languages", languages.join(","));
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
          <Label htmlFor="name">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>
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
          <Label htmlFor="graduation">Graduation</Label>
          <Input
            id="graduation"
            value={graduation}
            onChange={(e) => setGraduation(e.target.value)}
            placeholder="Enter graduation details"
          />
        </div>
        <div>
          <Label htmlFor="experience">Experience</Label>
          <Input
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Describe your experience"
          />
        </div>
        <div>
          <Label htmlFor="awards">Awards</Label>
          <Input
            id="awards"
            value={awards}
            onChange={(e) => setAwards(e.target.value)}
            placeholder="Enter your awards"
          />
        </div>
        <div>
          <Label htmlFor="languages">Languages</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {languages.map((lang, index) => (
              <span
                key={index}
                className="bg-extraBg text-lightPrime px-2 py-1 rounded-full text-sm flex items-center"
              >
                {lang}
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(index)}
                  className="ml-1 focus:outline-none"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <Input
            id="languages"
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleAddLanguage}
            placeholder="Add languages (press Enter or use comma)"
          />
        </div>
        <Button type="submit" className="w-full">
          {createProfileLoading ? <CircularProgress /> : "Create Profile"}
        </Button>
      </form>
    </div>
  );
}
