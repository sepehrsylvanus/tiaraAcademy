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
import { useLocale, useMessages, useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

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
  const locale = useLocale();
  const t = useTranslations("About");
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="/aboutUsBanner.jpg"
          alt="About Tiara Academy"
          fill
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
          className="flex flex-col gap-12 items-center my-4"
          variants={fadeIn}
        >
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
          {locale === "fa" ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                آکادمی تیارا: پلی برای ارتباط بین فرهنگ‌ها
              </h2>
              <p>
                آکادمی تیارا توسط{" "}
                <span className="font-bold">خشایار محمدی</span> و{" "}
                <span className="font-bold">ارسلان اجابتی‌فر</span>، دو
                علاقه‌مند به یادگیری زبان، تأسیس شد. این دو با ترکیب تجربه
                خشایار در حوزه زبان‌شناسی و علاقه عمیق او به تدریس، همراه با
                تخصص ارسلان به‌عنوان یک چندزبانه و کارآفرین باتجربه، بستری را
                ایجاد کردند که یادگیری زبان را به یک تجربه جذاب و تحول‌آفرین
                تبدیل می‌کند.
              </p>
              <h2 className="text-3xl font-bold">ماموریت ما</h2>
              <p>
                ماموریت ما در آکادمی تیارا این است که مهارت‌های زبانی لازم را به
                افراد آموزش دهیم تا بتوانند با جهان اطراف خود ارتباط برقرار
                کنند. ما باور داریم که زبان فراتر از یک ابزار ارتباطی است؛ زبان
                کلیدی است برای درک فرهنگ‌ها، دیدگاه‌ها و ایده‌های متفاوت.
              </p>
              <h2 className="text-3xl font-bold">چشم‌انداز ما</h2>
              <p>
                ما جهانی را تصور می‌کنیم که در آن موانع زبانی جلوی رشد فردی و
                حرفه‌ای را نمی‌گیرند. هدف ما تبدیل‌شدن به پیشروترین پلتفرم آموزش
                زبان در ایران است، با ارائه راهکارهای نوآورانه و در دسترس برای
                تمام سطوح یادگیری.
              </p>
              <h2 className="text-3xl font-bold">خدمات ما</h2>
              <p>
                ما طیف گسترده‌ای از خدمات را ارائه می‌دهیم که متناسب با نیازهای
                متنوع زبان‌آموزان طراحی شده‌اند:
              </p>
              <ul className="space-y-2">
                <li>
                  <span className="font-bold">کلاس‌های تعاملی آنلاین</span>{" "}
                  یادگیری زنده با اساتید حرفه‌ای برای تقویت مهارت‌های زبانی شما.
                  skills.
                </li>
                <li>
                  <span className="font-bold">دوره‌های ویدیویی جامع</span> آموزش
                  با ساختار دقیق و محتوای باکیفیت، مناسب برای یادگیری با سرعت
                  دلخواه.
                </li>
                <li>
                  <span className="font-bold">مقالات آموزشی وبلاگ</span> نکات،
                  راهکارها و استراتژی‌های مفید برای بهبود مسیر یادگیری زبان.
                </li>
                <li>
                  <span className="font-bold">تدریس خصوصی</span> مشاوره فردی و
                  اختصاصی برای دستیابی به اهداف زبان‌آموزی شما.
                </li>
              </ul>
              <h2 className="text-3xl font-bold">چرا تیارا؟</h2>
              <ul>
                <li>
                  <span className="font-bold">کیفیت و تخصص: </span>دوره‌های ما
                  توسط اساتید مجرب طراحی شده‌اند تا بهترین و دقیق‌ترین آموزش
                  ممکن را ارائه دهند.
                </li>
                <li>
                  <span className="font-bold">نوآوری در یادگیری: </span>ابزارهای
                  تعاملی ما از جدیدترین تکنولوژی‌های آموزشی بهره می‌برند تا
                  تجربه‌ای مدرن و جذاب فراهم کنند.
                </li>
                <li>
                  <span className="font-bold">انعطاف‌پذیری: </span>با گزینه‌هایی
                  که مطابق برنامه روزانه شما طراحی شده‌اند، یادگیری آسان‌تر و در
                  دسترس‌تر خواهد بود.
                </li>
              </ul>
              <h2 className="text-3xl font-bold">تعهد به بهبود مستمر</h2>
              <p>
                ما در آکادمی تیارا متعهد به ارتقای مداوم خدمات و پلتفرم خود
                هستیم. بازخورد شما برای ما بسیار ارزشمند است و ما محتوای خود را
                به‌طور منظم به‌روزرسانی می‌کنیم تا بهترین تجربه یادگیری ممکن را
                به شما ارائه دهیم.
              </p>
              <h2 className="text-3xl font-bold">به ما بپیوندید</h2>
              <p>
                آماده‌اید تا مسیر یادگیری زبان خود را آغاز کنید؟ دوره‌های ما را
                کشف کنید، به جامعه بزرگ ما بپیوندید و اولین قدم را برای تغییر
                آینده خود بردارید!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Tiara Academy: Connecting Cultures Through Language
              </h2>
              <p>
                Founded by language enthusiasts{" "}
                <span className="font-bold">Khashayar Mohammadi</span> and{" "}
                <span className="font-bold">Arsalan Ejabatifar</span>, Tiara
                Academy began its journey with a shared passion for languages
                and a mission to bridge cultural divides. Combining Khashayar's
                strong background in linguistics and love for teaching with
                Arsalan's expertise as a polyglot and seasoned entrepreneur,
                Tiara Academy was born—a platform dedicated to transforming
                language learning into an immersive and enriching experience.
              </p>
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p>
                At Tiara Academy, our mission is to empower individuals with the
                language skills they need to connect with the world. We believe
                that language is not just a tool for communication—it’s a
                gateway to understanding diverse cultures, perspectives, and
                ideas.
              </p>
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p>
                We envision a world where language barriers no longer hinder
                personal and professional growth. As Iran’s leading language
                learning platform, our goal is to provide innovative and
                accessible solutions for learners of all levels, helping them
                unlock their potential.
              </p>
              <h2 className="text-3xl font-bold">What We Offer</h2>
              <p>
                We provide a variety of services tailored to meet the diverse
                needs of our learners:
              </p>
              <ul className="space-y-2">
                <li>
                  <span className="font-bold">Interactive Live Classes:</span>{" "}
                  Engage with expert instructors in real-time to enhance your
                  skills.
                </li>
                <li>
                  <span className="font-bold">
                    Comprehensive Video Courses:
                  </span>{" "}
                  Learn at your own pace with structured and high-quality
                  materials.
                </li>
                <li>
                  <span className="font-bold">Insightful Blog Articles:</span>{" "}
                  Discover tips, tricks, and strategies to optimize your
                  language learning journey.
                </li>
                <li>
                  <span className="font-bold">Personalized Tutoring:</span>{" "}
                  Receive one-on-one guidance tailored to your specific goals.
                </li>
              </ul>
              <h2 className="text-3xl font-bold">What Sets Us Apart</h2>
              <ul>
                <li>
                  <span className="font-bold">Quality and Expertise:</span>All
                  our courses are crafted by certified language experts to
                  ensure accuracy and effectiveness.
                </li>
                <li>
                  <span className="font-bold">Innovation in Learning:</span>Our
                  interactive tools utilize the latest educational technologies,
                  offering an engaging and modern learning experience.
                </li>
                <li>
                  <span className="font-bold">Flexibility:</span>With options
                  designed to fit into your busy schedule, we make learning
                  convenient and accessible.
                </li>
              </ul>
              <h2 className="text-3xl font-bold">Commitment to Improvement</h2>
              <p>
                At Tiara Academy, we are dedicated to continuously enhancing our
                platform and services. Your feedback is invaluable to us, and we
                regularly update our content and features based on your
                suggestions to ensure you receive the best possible learning
                experience.
              </p>
              <h2 className="text-3xl font-bold">Join Us</h2>
              <p>
                Are you ready to embark on your language learning journey?
                Explore our courses, join our growing community, and take the
                first step toward transforming your future today!
              </p>
            </div>
          )}
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      {/* <section className="container py-16 bg-muted/50">
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
      </section> */}

      {/* Call to Action */}
      <Separator className="my-6" />
      <section className="container py-16 md:py-24">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t("ready")}</h2>
          <p className="text-lg text-muted-foreground">{t("readyDesc")}</p>
          <div className="flex justify-center ">
            <Button
              size="lg"
              asChild
              className="flex rtl:flex-row-reverse w-fit justify-center"
            >
              <Link href="/sign-up" className="group">
                {t("joinToday")}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
