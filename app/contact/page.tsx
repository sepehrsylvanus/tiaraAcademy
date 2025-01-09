import {
  Mail,
  Phone,
  Clock,
  Users,
  HelpCircle,
  Youtube,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Send,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getMessages } from "next-intl/server";
import Image from "next/image";

export default async function ContactPage() {
  const translations = (await getMessages()) as any;
  const t = translations.ContactUs;
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Link
        href={"/"}
        className="absolute top-2 left-2 md:ltr:left-[5em] ltr:left-2"
      >
        <Image src={"/logo.png"} alt="Logo" width={60} height={60} />
      </Link>
      {/* Hero Section */}
      <img
        src={"/contactUsBanner.jpg"}
        alt="Contact Tiara Academy"
        className="mx-auto w-full mt-20"
      />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-black/[0.2] -z-10" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text ">
              {t.contactInfo}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.contactInfoDesc}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Email Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Mail className="h-5 w-5" />
                {t.email}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">{t.general}</h3>
                  <p>{t.generalEmail}</p>
                  <Link
                    href="mailto:tiaraacademytehran@gmail.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-300"
                  >
                    <Mail className="h-4 w-4" />
                    tiaraacademytehran@gmail.com
                  </Link>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">{t.support}</h3>
                  <p>{t.supportEmail}</p>
                  <Link
                    href="mailto:tiaraacademytehran@gmail.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-300"
                  >
                    <Mail className="h-4 w-4" />
                    tiaraacademytehran@gmail.com
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Phone Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20 flex justify-center flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Phone className="h-5 w-5" />
                {t.phone}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 ">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">{t.phoneDesc}</h3>
                  <Link
                    href="tel:09102905410"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group-hover:translate-x-1 duration-300"
                  >
                    <Phone className="h-4 w-4" />
                    09102905410
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Teachers Contact Form Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users className="h-5 w-5" />
                {t.sendMessage}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t.connectForm}</p>
              <Button
                asChild
                className="group-hover:translate-x-1 duration-300"
              >
                <Link href="/teachers">
                  {t.visitTeachersPage}
                  <Users className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* FAQs Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <HelpCircle className="h-5 w-5" />
                {t.faqs}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t.faqsDesc1}
                <Link className="text-extraText underline" href={"/faq"}>
                  {t.faqsLink}
                </Link>
                {t.faqsDesc2}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Section */}
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 mb-12">
          <div className="absolute inset-0 bg-grid-small-black/[0.2] -z-10" />
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">{t.social}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.socialDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                {
                  icon: Youtube,
                  label: "YouTube",
                  href: "https://youtube.com/@tiaraacademy",
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "https://www.instagram.com/tiaraacademy.tehran?igsh=ZDMwbnBwMGIydjY1",
                },
                { icon: Facebook, label: "Facebook", href: "#facebook" },
                { icon: Linkedin, label: "LinkedIn", href: "#linkedin" },
                { icon: Twitter, label: "X (Twitter)", href: "#twitter" },
                {
                  icon: Send,
                  label: "Telegram",
                  href: "https://t.me/tiaraacademytehran",
                },
              ].map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  asChild
                >
                  <Link href={social.href} aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Promise Section */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background to-primary/10" />
          <div className="relative text-center p-8 space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold">{t.promise}</h2>
            <p className="text-muted-foreground">{t.promiseDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
