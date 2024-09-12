"use client";

import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function CreateTeacherProfile() {
  const [name, setName] = useState("");
  const [graduation, setGraduation] = useState("");
  const [experience, setExperience] = useState("");
  const [awards, setAwards] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState("");

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

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Profile</h2>
      <form className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
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
          <Textarea
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
                className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
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
          Create Profile
        </Button>
      </form>
    </div>
  );
}
