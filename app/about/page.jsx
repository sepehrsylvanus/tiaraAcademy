"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Users,
  Target,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="/aboutUs.jpeg"
          alt="About Tiara Academy"
          fill
          className="object-cover "
          priority
          style={{ filter: "brightness(50%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center space-y-4 p-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              About Tiara Academy
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              Empowering individuals through language learning and cultural
              understanding
            </p>
          </motion.div>
        </div>
        <Link
          href="/"
          className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </section>

      {/* Founders Section */}
      <motion.section
        className="container py-16 md:py-24"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={fadeIn}
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded by language enthusiasts,{" "}
              <span className="font-bold">Khashayar Mohammadi</span> and{" "}
              <span className="font-bold">Arsalan Ejabatifar</span>, Tiara
              Academy's journey began with a shared passion for languages and a
              mission to bridge cultural divides.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Khashayar, with a strong background in linguistics and a love for
              teaching, and Arsalan, a polyglot and seasoned entrepreneur,
              combined their expertise to create a platform that transforms
              language learning into an immersive experience.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="group overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src="/khashayar.jpg"
                  alt="Khashayar Mohammadi"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </CardContent>
            </Card>
            <Card className="group overflow-hidden mt-8">
              <CardContent className="p-0">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Arsalan Ejabatifar"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      <section className="container py-16 bg-muted/50">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeIn}>
            <Card className="h-full">
              <CardContent className="p-6 space-y-4">
                <Globe className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-semibold">Global Reach</h3>
                <p className="text-muted-foreground">
                  Connect with learners and teachers from around the world
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="h-full">
              <CardContent className="p-6 space-y-4">
                <Users className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-semibold">Expert Teachers</h3>
                <p className="text-muted-foreground">
                  Learn from certified language experts and native speakers
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="h-full">
              <CardContent className="p-6 space-y-4">
                <Target className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-semibold">Personalized Learning</h3>
                <p className="text-muted-foreground">
                  Tailored courses to meet your specific goals and needs
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="h-full">
              <CardContent className="p-6 space-y-4">
                <Sparkles className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-semibold">Interactive Tools</h3>
                <p className="text-muted-foreground">
                  Engaging learning experience with modern technology
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="container py-16 md:py-24">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join our community of language learners and start your
            transformation today. Explore our courses, connect with native
            speakers, and unlock new opportunities.
          </p>
          <Button size="lg" asChild>
            <Link href="/sign-up" className="group">
              Join Us Today
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
