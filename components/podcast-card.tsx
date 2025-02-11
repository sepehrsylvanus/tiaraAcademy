"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Clock } from "lucide-react";
import Image from "next/image";
import { Podcast } from "@/utils/types";
import { useTrendPodcast } from "@/hooks/usePodcast";

interface PodcastCardProps {
  podcast: Podcast;
  isPlaying?: boolean;
  handlePodcastClick: (podcast: Podcast) => void;
}

export function PodcastCard({
  podcast,
  isPlaying,
  handlePodcastClick,
}: PodcastCardProps) {
  const { mutate: makeThisTrend } = useTrendPodcast();
  return (
    <Card className="relative group">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Image
            src={podcast.imageLink || "/placeholder.svg"}
            alt={podcast.name}
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play
                className="h-4 w-4"
                onClick={() => {
                  handlePodcastClick(podcast);
                }}
              />
            )}
          </Button>
          {isPlaying && (
            <div className="absolute top-2 right-2">
              <Badge
                variant="secondary"
                className="bg-primary text-primary-foreground"
              >
                Playing
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {podcast.categories.map((category, index) => (
            <Badge key={index} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        <CardTitle className="line-clamp-1">{podcast.name}</CardTitle>

        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {podcast.duration} min
          </span>
        </div>

        {/* Button to toggle trending status */}
        <div className="mt-4">
          <Button
            onClick={() => makeThisTrend(podcast.id)}
            variant="outline"
            className={podcast.trend ? "trending-button" : ""}
          >
            Trend this
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
