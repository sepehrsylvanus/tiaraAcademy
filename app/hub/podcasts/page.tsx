"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import Image from "next/image";
import { Filter, Podcast } from "@/utils/types";
import { PodcastCard } from "@/components/podcast-card";
import { PodcastFilters } from "@/components/podcast-filters";
import { AudioPlayer } from "@/components/audio-player";

export default function PodcastPage() {
  const [filters, setFilters] = useState<Filter>({
    search: "",
    level: "",
    duration: "",
    category: "",
  });
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);

  const handleFilterChange = (key: keyof Filter, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredPodcasts = useMemo(() => {
    return otherPodcasts.filter((podcast) => {
      const matchesSearch =
        podcast.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        podcast.description
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesLevel = !filters.level || podcast.level === filters.level;

      const matchesDuration =
        !filters.duration ||
        (() => {
          const duration = Number.parseInt(podcast.duration);
          switch (filters.duration) {
            case "0-15":
              return duration <= 15;
            case "15-30":
              return duration > 15 && duration <= 30;
            case "30+":
              return duration > 30;
            default:
              return true;
          }
        })();

      const matchesCategory =
        !filters.category || podcast.category === filters.category;

      return (
        matchesSearch && matchesLevel && matchesDuration && matchesCategory
      );
    });
  }, [filters]);

  const handlePodcastClick = (podcast: Podcast) => {
    setCurrentPodcast(podcast);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Learn English Through Podcasts
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Enhance your listening skills and vocabulary with our
                  carefully curated collection of educational podcasts.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="inline-flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  Start Listening
                </Button>
                <Button variant="outline">View All Podcasts</Button>
              </div>
            </div>
            <Image
              src="/podcastCanvas.png"
              width={600}
              height={400}
              alt="Students listening to podcasts"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Top Podcasts Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                🔴 Live Now
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Top Podcasts
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our most popular episodes to help you master English
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            {topPodcasts.map((podcast, index) => (
              <div
                key={index}
                onClick={() => handlePodcastClick(podcast)}
                className="cursor-pointer"
              >
                <PodcastCard
                  podcast={podcast}
                  isPlaying={currentPodcast?.title === podcast.title}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Podcasts Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                More Episodes
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore our complete collection of English learning podcasts
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="max-w-5xl mx-auto mt-8 mb-12">
            <PodcastFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Podcast Grid */}
          <div className="mx-auto grid max-w-5xl items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPodcasts.length > 0 ? (
              filteredPodcasts.map((podcast, index) => (
                <PodcastCard key={index} podcast={podcast} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No podcasts found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Audio Player */}
      {currentPodcast && (
        <AudioPlayer
          podcast={currentPodcast}
          isMinimized={isPlayerMinimized}
          onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
        />
      )}
    </div>
  );
}

const topPodcasts: Podcast[] = [
  {
    title: "Daily Conversations in English",
    description:
      "Learn common phrases and expressions used in everyday situations",
    image: "/placeholder.svg?height=400&width=600",
    duration: "15",
    level: "Beginner",
    category: "Conversation",
  },
  {
    title: "Business English Essentials",
    description: "Master professional vocabulary and communication skills",
    image: "/placeholder.svg?height=400&width=600",
    duration: "20",
    level: "Intermediate",
    category: "Business",
  },
  {
    title: "Advanced English Literature",
    description: "Explore classic works and improve advanced comprehension",
    image: "/placeholder.svg?height=400&width=600",
    duration: "25",
    level: "Advanced",
    category: "Literature",
  },
];

const otherPodcasts: Podcast[] = [
  {
    title: "English Grammar Made Easy",
    description: "Simple explanations of complex grammar rules",
    image: "/placeholder.svg?height=400&width=600",
    duration: "10",
    level: "Beginner",
    category: "Grammar",
  },
  {
    title: "Travel English Guide",
    description: "Essential phrases for your next adventure",
    image: "/placeholder.svg?height=400&width=600",
    duration: "15",
    level: "Intermediate",
    category: "Travel",
  },
  {
    title: "English Idioms & Slang",
    description: "Understanding common expressions and casual speech",
    image: "/placeholder.svg?height=400&width=600",
    duration: "20",
    level: "Advanced",
    category: "Conversation",
  },
  {
    title: "IELTS Preparation",
    description: "Tips and strategies for IELTS success",
    image: "/placeholder.svg?height=400&width=600",
    duration: "30",
    level: "Advanced",
    category: "IELTS",
  },
  {
    title: "English Pronunciation",
    description: "Perfect your accent and speaking skills",
    image: "/placeholder.svg?height=400&width=600",
    duration: "15",
    level: "Intermediate",
    category: "Conversation",
  },
  {
    title: "English for Kids",
    description: "Fun and engaging lessons for young learners",
    image: "/placeholder.svg?height=400&width=600",
    duration: "10",
    level: "Beginner",
    category: "Kids",
  },
];
