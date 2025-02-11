"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  SkipBack,
  SkipForward,
} from "lucide-react";
import Image from "next/image";
import { Podcast } from "@/utils/types";
import { Button } from "./ui/button";
import { formatTime } from "@/utils/helperFunctions";
import { Slider } from "./ui/slider";

interface AudioPlayerProps {
  podcast: Podcast;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export function AudioPlayer({
  podcast,
  isMinimized,
  onToggleMinimize,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        setVolume(1);
        setIsMuted(false);
      } else {
        setVolume(0);
        setIsMuted(true);
      }
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg transition-all duration-300 ${
        isMinimized ? "h-16" : "h-24 sm:h-32"
      }`}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full gap-4">
          {/* Podcast Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div
              className={`relative ${isMinimized ? "w-12 h-12" : "w-20 h-20"}`}
            >
              <Image
                src={podcast.imageLink || "/placeholder.svg"}
                alt={podcast.name}
                className="rounded-lg object-cover"
                fill
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold truncate">{podcast.name}</h3>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex flex-col justify-center flex-1 max-w-2xl gap-2">
            <div className="flex rtl:flex-row-reverse items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Math.max(
                      0,
                      currentTime - 10
                    );
                  }
                }}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 sm:h-10 sm:w-10"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Math.min(
                      duration,
                      currentTime + 10
                    );
                  }
                }}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            {!isMinimized && (
              <div className="flex items-center gap-2">
                <span className="text-sm tabular-nums">
                  {formatTime(currentTime)}
                </span>
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={handleSeek}
                  className="flex-1"
                />
                <span className="text-sm tabular-nums">
                  {formatTime(duration)}
                </span>
              </div>
            )}
          </div>

          {/* Volume Controls */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="hidden sm:flex items-center gap-2 rtl:flex-row-reverse">
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <Slider
                value={[volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-24  "
              />
            </div>
            <Button variant="ghost" size="icon" onClick={onToggleMinimize}>
              {isMinimized ? (
                <Maximize2 className="h-5 w-5" />
              ) : (
                <Minimize2 className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={podcast.voiceLink} // Use the voiceLink property here
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />
    </div>
  );
}
