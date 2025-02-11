import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Clock, BookOpen } from "lucide-react";
import Image from "next/image";
import { Podcast } from "@/utils/types";

interface PodcastCardProps {
  podcast: Podcast;
  isPlaying?: boolean;
}

export function PodcastCard({ podcast, isPlaying }: PodcastCardProps) {
  return (
    <Card className="relative group">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <Image
            src={podcast.image || "/placeholder.svg"}
            alt={podcast.title}
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
              <Play className="h-4 w-4" />
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
          <Badge variant="secondary">{podcast.category}</Badge>
        </div>
        <CardTitle className="line-clamp-1">{podcast.title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-2">
          {podcast.description}
        </CardDescription>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {podcast.duration} min
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {podcast.level}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
