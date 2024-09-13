import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSingleUser, getTeacherProfile } from "@/actions/userActions";
import { User } from "@/utils/types";
import { capitalizeFirstLetter } from "@/utils/helperFunctions";
type Params = {
  teacher: string;
};
export default async function Component({ params }: { params: Params }) {
  console.log(params.teacher);
  const teacherUser = await getSingleUser();
  console.log(teacherUser);
  const teacherProfile = await getTeacherProfile(params.teacher);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-12">
        <div className="flex justify-center">
          <Avatar className="w-32 h-32">
            <AvatarImage src={teacherUser?.image!} alt="Teacher Profile" />
            <AvatarFallback>{`${teacherUser?.fName[0]}${teacherUser?.lName?.[0]}`}</AvatarFallback>
          </Avatar>
        </div>
        <div className="grid gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{`${teacherUser?.fName} ${teacherUser?.lName}`}</h1>
            <p className="text-muted-foreground">
              {teacherProfile?.description}
            </p>
          </div>
          <div className="grid gap-4">
            <div>
              <h2 className="text-xl font-semibold">About Me</h2>
              <p className="text-muted-foreground">{teacherProfile?.bio}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Experiences</h2>
              <ul className="grid gap-2 text-muted-foreground">
                <li>
                  <div className="flex items-center gap-2">
                    <GraduationCapIcon className="w-5 h-5" />
                    <span>{teacherProfile?.graduation}</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="w-5 h-5" />
                    <span>{teacherProfile?.experience}</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <AwardIcon className="w-5 h-5" />
                    <span>{teacherProfile?.awards}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Languages</h2>
              <ul className="grid gap-2 text-muted-foreground">
                {teacherProfile?.languagesArr.map((language, index) => (
                  <li key={index}>
                    <div className="flex items-center gap-2">
                      <FlagIcon className="w-5 h-5" />
                      <span>{language}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-12" />
      <div className="grid gap-12">
        <div>
          <h2 className="text-2xl font-bold">Classes</h2>
          <div className="grid gap-6 mt-6">
            {teacherUser?.Class.map((cls, index) => (
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
          <h2 className="text-2xl font-bold">Articles</h2>
          <div className="grid gap-6 mt-6">
            <div className="grid md:grid-cols-[200px_1fr] gap-4">
              <img
                src="/placeholder.svg"
                width={200}
                height={150}
                alt="Article Thumbnail"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "200/150", objectFit: "cover" }}
              />
              <div>
                <h3 className="text-xl font-semibold">
                  Effective Strategies for Teaching Math
                </h3>
                <p className="text-muted-foreground">
                  Discover proven techniques to make math engaging and
                  accessible for students of all levels.
                </p>
                <Link href="#" className="text-primary" prefetch={false}>
                  Read More
                </Link>
              </div>
            </div>
            <div className="grid md:grid-cols-[200px_1fr] gap-4">
              <img
                src="/placeholder.svg"
                width={200}
                height={150}
                alt="Article Thumbnail"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "200/150", objectFit: "cover" }}
              />
              <div>
                <h3 className="text-xl font-semibold">
                  Integrating Technology in the Classroom
                </h3>
                <p className="text-muted-foreground">
                  Explore how to effectively incorporate digital tools and
                  resources to enhance student learning.
                </p>
                <Link href="#" className="text-primary" prefetch={false}>
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-12" />
      <div className="grid gap-6">
        <h2 className="text-2xl font-bold">Contact Me</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Have a question or want to discuss a topic further? Feel free to
              reach out using the form below.
            </p>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message" />
            </div>
            <Button>Send Message</Button>
          </div>
          <div className="bg-muted rounded-lg p-6">
            <h3 className="text-xl font-semibold">Get in Touch</h3>
            <div className="grid gap-4 mt-4">
              <div className="flex items-center gap-2">
                <MailIcon className="w-5 h-5" />
                <span>{teacherUser?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5" />
                <span>{teacherUser?.pNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AwardIcon(props: any) {
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
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  );
}

function BriefcaseIcon(props: any) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function FlagIcon(props: any) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function GraduationCapIcon(props: any) {
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
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

function LocateIcon(props: any) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
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
