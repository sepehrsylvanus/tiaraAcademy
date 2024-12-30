import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { getTeacherProfile } from "@/actions/userActions";
import { capitalizeFirstLetter } from "@/utils/helperFunctions";
import PendingTeacher from "@/components/pendingTeacher/PendingTeacher";
import { getLocale, getMessages } from "next-intl/server";
import SendToTeacher from "@/components/SendToTeacher";
type Params = {
  teacher: string;
};
export default async function Component({ params }: { params: Params }) {
  const locale = await getLocale();
  const teacherProfile = await getTeacherProfile(params.teacher);
  const translations = (await getMessages()) as any;
  const t = translations.TeacherProfile;
  const extractFirstLine = (htmlContent: string): string => {
    const match = htmlContent.match(/<p>(.*?)<\/p>/);
    if (match && match[1]) {
      const firstParagraphText = match[1];

      return firstParagraphText.split(".")[0] + "...";
    }
    return "";
  };

  if (teacherProfile) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12">
          <div className="flex justify-center">
            <Avatar className="w-32 h-32">
              <AvatarImage src={teacherProfile?.image!} alt="Teacher Profile" />
              <AvatarFallback>{`${teacherProfile?.fName?.[0]}${teacherProfile?.lName?.[0]}`}</AvatarFallback>
            </Avatar>
          </div>
          <div className="grid gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{`${teacherProfile?.fName} ${teacherProfile?.lName}`}</h1>

              <div className="grid gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{t.aboutMe}</h2>
                  <p className="text-muted-foreground">
                    {locale === "en"
                      ? teacherProfile.bio
                      : teacherProfile.persianBio}
                  </p>
                </div>
              </div>
              <div
                className="text-muted-foreground"
                dangerouslySetInnerHTML={
                  locale === "en"
                    ? { __html: teacherProfile.description ?? "" }
                    : { __html: teacherProfile.persianDescription ?? "" }
                }
              />
            </div>
          </div>
        </div>
        <Separator className="my-12" />
        <div className="grid gap-12">
          <div>
            <h2 className="text-2xl font-bold">{t.classes}</h2>
            <div className="grid gap-6 mt-6">
              {teacherProfile?.Class?.map((cls, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-[1fr_auto] gap-4 items-center"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{cls.title}</h3>
                    <p className="text-muted-foreground">
                      {cls.days.map((day, index) => (
                        <span key={index}>{`${capitalizeFirstLetter(
                          day
                        )}, `}</span>
                      ))}{" "}
                      - 9:00 AM to 10:30 AM
                    </p>
                  </div>
                  <Link href={`/hub/classes/${cls.id}`}>
                    <Button variant="outline" role="link">
                      Enroll
                    </Button>
                  </Link>{" "}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{t.articles}</h2>
            <div className="grid gap-6 mt-6">
              {teacherProfile.Blog?.map((blog) => (
                <div className="grid md:grid-cols-[200px_1fr] gap-4">
                  <img
                    src={blog.image ?? "/articlePlaceholder.png"}
                    width={200}
                    height={150}
                    alt={`${blog.title}`}
                    className="rounded-lg object-cover"
                    style={{ aspectRatio: "200/150", objectFit: "cover" }}
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{blog.title}</h3>
                    <p className="text-muted-foreground">
                      {extractFirstLine(blog.text)}
                    </p>
                    <Link href="#" className="text-primary" prefetch={false}>
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-12" />
        <div className="grid gap-6">
          <h2 className="text-2xl font-bold">{t.contactMe}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">{t.description}</p>

              <SendToTeacher
                teacherId={params.teacher}
                teacherName={`${teacherProfile.fName} ${teacherProfile.lName}`}
              />
            </div>
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-xl font-semibold">{t.getInTouch}</h3>
              <div className="grid gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <MailIcon className="w-5 h-5" />
                  <span>{teacherProfile?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <PendingTeacher />;
  }
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
