"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import UpdateIcon from "@mui/icons-material/Update";
import WorkIcon from "@mui/icons-material/Work";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";
import ForumIcon from "@mui/icons-material/Forum";
import { Separator } from "@/components/ui/separator";
import AddComment from "@/components/addComment/AddComment";
import EditIcon from "@mui/icons-material/Edit";
import {
  useAddFreeVideoCourse,
  useEditvideoCourse,
  useGetCourseVideosDetails,
} from "@/hooks/useVideos";
import { VideoCourses } from "@/constants";
import { useGetUser } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import { buyVideoCourse, getVerifiedCoursePayment } from "@/actions/payment";
import { useTranslations } from "next-intl";
import DOMPurify from "dompurify";
import { fetchRegisteredVideoCourse } from "@/actions/videos/videos.action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { VideoCourse } from "@/utils/types";
import TextEditor from "@/components/TextEditor";
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";
import { Google } from "@mui/icons-material";
import { extractPaths } from "@/utils/helperFunctions";
import { CircularProgress } from "@mui/material";

type SingleVideoProps = {
  params: {
    id: string;
  };
};

type verifiedCourse = {
  id: string;
  courseId: string;
  userId: string;
  resnumber: string;
  verified: boolean;
};
const SingleVideo = ({ params }: SingleVideoProps) => {
  const t = useTranslations("VideoCourse");
  const editDialogTranslations = useTranslations("EditDialog");
  const [openComment, setOpenComment] = useState(false);
  const [verifiedCourse, setVerifiedCourse] = useState<verifiedCourse[]>([]);
  useEffect(() => {
    console.log(verifiedCourse);
  }, [verifiedCourse]);

  const [registeredVideoCourse, setRegisteredVideoCourse] = useState<any>();
  const [registeredVideoCourseLoading, setRegisteredVideoCourseLoading] =
    useState(true);
  const { data: videoDetails, isLoading: videoDetailsLoading } =
    useGetCourseVideosDetails(params.id);
  const { mutate: editVideo } = useEditvideoCourse();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [freeVideoUsers, setFreeVideoUsers] = useState<freeVideoUsers>([]);
  const [editingVideo, setEditingVideo] = useState<VideoCourse | null>(null);

  const [explenation, setExplenation] = useState<string>("");
  const router = useRouter();
  const { data: currentUser, isLoading: currentUserLoading } = useGetUser();
  useEffect(() => {
    const getRegisteredVideoCourse = async () => {
      if (currentUser && videoDetails) {
        setExplenation(videoDetails?.explenation);

        const registeredVideos = await fetchRegisteredVideoCourse(
          currentUser.id,
          videoDetails.id
        );
        setRegisteredVideoCourse(registeredVideos);
      }
    };
    getRegisteredVideoCourse();
  }, [currentUser, videoDetails]);

  const { mutate: addFreeVideoCourse } = useAddFreeVideoCourse();

  useEffect(() => {
    const getVerifiedCourse = async () => {
      if (currentUser) {
        const verifiedCourse = await getVerifiedCoursePayment({
          id: params.id,
          userId: currentUser.id,
        });
        setVerifiedCourse(verifiedCourse);

        setFreeVideoUsers(freeVideoUsers);
        setRegisteredVideoCourseLoading(false);
      }
      setRegisteredVideoCourseLoading(false);
    };
    getVerifiedCourse();
  }, [currentUser, params]);

  const pureHTML = DOMPurify.sanitize(videoDetails?.explenation!);
  const handleBuyCourse = async () => {
    if (videoDetails?.price !== 0) {
      if (Number(videoDetails?.discount) > 0) {
        const buyVideo = await buyVideoCourse(
          Number(videoDetails?.discountedPrice),
          videoDetails!.title,
          videoDetails!.id
        );
        if (buyVideo) {
          router.push(buyVideo);
        }
      } else {
        const buyVideo = await buyVideoCourse(
          videoDetails!.price,
          videoDetails!.title,
          videoDetails!.id
        );
        if (buyVideo) {
          router.push(buyVideo);
        }
      }
    } else {
      addFreeVideoCourse({
        videoCourseId: videoDetails.id,
        userId: currentUser!.id!,
      });
    }
  };

  // START EDIT VIDEO COURSE

  const handleEdit = (videoCourse: VideoCourse) => {
    setEditingVideo({ ...videoCourse });
    setIsDialogOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof VideoCourse
  ) => {
    if (!editingVideo || !videoDetails) return;
    const value = e.target.value;
    setEditingVideo((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", editingVideo?.id ?? "");
    formData.append("title", editingVideo?.title ?? "");
    formData.append("price", editingVideo?.price.toString() ?? "");
    formData.append("discount", editingVideo?.discount.toString() ?? "");
    formData.append("description", editingVideo?.description ?? "");
    formData.append("explenation", explenation);
    if (editingVideo) {
      editVideo(formData);
      setIsDialogOpen(false);
    }
  };

  // END OF EDIT VIDEO COURSE

  const ifbuyed = verifiedCourse.length > 0 || freeVideoUsers?.length > 0;
  if (!videoDetailsLoading && !registeredVideoCourseLoading) {
    const discountedPrice = Number(videoDetails?.discountedPrice);
    const discount = Number(videoDetails?.discount);
    return (
      <div className="md:w-9/12  pb-[6em] mx-auto w-full md:px-0 px-4">
        <section
          id="introduction"
          className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full mt-[4em]"
        >
          <div id="text " className="order-2 md:order-none">
            <h2 className="mb-4">{videoDetails?.title}</h2>
            <p>{videoDetails?.description}</p>
            {!currentUserLoading && currentUser && (
              <div
                id="price&register"
                className="flex justify-between mt-4 flex-col-reverse  items-center gap-5"
              >
                {ifbuyed || registeredVideoCourse?.length > 0 ? (
                  <Button
                    className=" md:w-auto mt-2 md:mt-0 bg-green-500 pointer-events-none  break-all flex-1"
                    onClick={handleBuyCourse}
                  >
                    {videoDetails?.price !== 0
                      ? t("alreadyBought")
                      : t("alreadyAdd")}
                  </Button>
                ) : (
                  <Button
                    className="w-full md:w-auto mt-2 md:mt-0 flex-1"
                    onClick={handleBuyCourse}
                  >
                    {videoDetails?.price !== 0 ? t("buy") : t("addToAccount")}
                  </Button>
                )}

                {!currentUserLoading &&
                currentUser &&
                currentUser?.role !== "student" ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/hub/videos/${params.id}/edit`}
                      className="w-full md:w-auto"
                    >
                      <Button className="w-full md:w-auto mt-2 md:mt-0 flex gap-2 flex-1">
                        <EditIcon /> {t("manageThisCourse")}
                      </Button>
                    </Link>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          className={`hover:bg-accent `}
                          onClick={() => handleEdit(videoDetails!)}
                        >
                          {t("editCourse")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="h-[70vh] overflow-y-scroll">
                        <DialogHeader>
                          <DialogTitle>
                            {editDialogTranslations("editVideoCourse")}
                          </DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={handleSave}
                          className="grid gap-4 py-4 "
                        >
                          <div className="grid gap-2">
                            <Label htmlFor="name">
                              {editDialogTranslations("videoCourseName")}
                            </Label>
                            <Input
                              id="name"
                              value={editingVideo?.title ?? ""}
                              onChange={(e) => handleInputChange(e, "title")}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="price">
                              {editDialogTranslations("price")}
                            </Label>
                            <Input
                              id="price"
                              step="0.01"
                              value={editingVideo?.price ?? 0}
                              onChange={(e) => handleInputChange(e, "price")}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="discount">
                              {editDialogTranslations("discount")} (%)
                            </Label>
                            <Input
                              id="discount"
                              min="0"
                              max="100"
                              value={editingVideo?.discount ?? 0}
                              onChange={(e) => handleInputChange(e, "discount")}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">
                              {editDialogTranslations("description")}
                            </Label>
                            <Textarea
                              id="description"
                              value={editingVideo?.description ?? ""}
                              onChange={(e) =>
                                handleInputChange(e, "description")
                              }
                            />
                          </div>
                          <div className="grid gap-2 overflow-y-scroll">
                            <Label htmlFor="discount">
                              {editDialogTranslations("explenation")}
                            </Label>
                            <TextEditor
                              textEditorContent={explenation}
                              setTextEditorContent={setExplenation}
                            />
                          </div>
                          <div className="flex gap-4 justify-end">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              {editDialogTranslations("cancel")}
                            </Button>
                            <Button type="submit">
                              {editDialogTranslations("saveChanges")}
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  ifbuyed && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full md:w-auto mt-2 md:mt-0 flex gap-2 flex-1">
                          <Download /> {t("downloadMaterials")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="flex flex-col items-center">
                        <Link
                          target="_blank"
                          href={videoDetails?.materialsGoogleDriveLink ?? "#"}
                          className="w-full md:w-auto"
                        >
                          <Button className="w-full md:w-auto mt-2 md:mt-0 flex gap-2 flex-1">
                            <Download /> {t("downloadFromGoogleDrive")}
                          </Button>
                        </Link>
                        <Link
                          href={videoDetails?.materialsLink ?? "#"}
                          className="w-full md:w-auto"
                        >
                          <Button className="w-full md:w-auto mt-2 md:mt-0 flex gap-2 flex-1">
                            <Google /> {t("downloadDirectly")}
                          </Button>
                        </Link>
                      </DialogContent>
                    </Dialog>
                  )
                )}
                {!ifbuyed && videoDetails?.price !== 0 && (
                  <div className="flex flex-col gap-2">
                    <p
                      className={`font-bold ${
                        discount && discount > 0
                          ? "line-through text-red-500"
                          : ""
                      }`}
                    >
                      <span className="mr-1">{videoDetails?.price}</span>
                      {t("toman")}
                    </p>

                    {discount > 0 && (
                      <p className="font-bold ">
                        <span className="mr-1">{discountedPrice}</span>
                        {t("toman")}
                      </p>
                    )}
                  </div>
                )}
                {videoDetails?.price === 0 && (
                  <p className="border border-lightText p-2 rounded-md pointer-events-none">
                    {t("free")}
                  </p>
                )}
              </div>
            )}

            {!currentUserLoading ? (
              !currentUser && (
                <div className="flex justify-between mt-4 flex-col-reverse  items-center gap-5 w-full">
                  <Link href={"/sign-in"} className="w-full">
                    <Button
                      className=" md:w-auto mt-2 md:mt-0  pointer-events-none  break-all flex-1 !w-full"
                      onClick={handleBuyCourse}
                    >
                      {t("loginFirstBuy")}
                    </Button>
                  </Link>
                </div>
              )
            ) : (
              <div
                className={`flex justify-center mt-4 flex-col-reverse  items-center gap-5 `}
              >
                <CircularProgress />
              </div>
            )}
          </div>

          <div
            id="coursePrevVideo"
            className={`order-1 ${
              !videoDetails?.videoCourseSession[0]?.video &&
              "grid place-content-center"
            }`}
          >
            <ReactPlayer
              width={"100%"}
              height={"auto"}
              controls
              url={videoDetails?.videoCourseSession[0]?.video}
            />
            {!videoDetails?.videoCourseSession[0]?.video && (
              <p className="font-bold text-lg">{t("noPreview")}</p>
            )}
          </div>
        </section>

        <section
          id="features"
          className="grid
       grid-cols-1 md:grid-cols-3 gap-3 justify-items-center mt-6"
        >
          <div className=" rounded-md w-full text-center bg-cardBg text-white">
            <FormatListNumberedIcon className="text-lightText " />
            <p className="text-extraText">{t("videoCount")}</p>
            <p className="text-lightText">
              {videoDetails?.videoCourseSession?.length ?? 0}
            </p>
          </div>
          <div className=" rounded-md w-full text-center bg-cardBg text-white">
            <UpdateIcon className="text-lightText " />
            <p className="text-extraText">{t("lastUpdate")}</p>
            <p className="text-lightText">
              {videoDetails?.updatedAt.toLocaleDateString()}
            </p>
          </div>
          <div className=" rounded-md md:w-full text-center bg-cardBg text-white col-span-2 md:col-span-1 w-full pb-2 pt-2">
            <WorkIcon className="text-lightText " />
            <p className="text-extraText">{t("preRequisities")}</p>
            <p className="text-lightText">
              {videoDetails?.prerequisities.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
              {videoDetails?.prerequisities.length === 0 &&
                t("noPrerequisities")}
            </p>
          </div>
        </section>

        <div className="flex flex-col md:flex-row-reverse gap-6">
          <section
            id="teacher"
            className="flex flex-col items-center mt-4 gap-2 rounded-md py-4 shadow-md bg-cardBg md:w-4/12 md:h-fit"
          >
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage
                src={
                  videoDetails?.teacher.image ?? "https://picsum.photos/200/300"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p className="font-bold">
              {`${t("teacher")}: `}

              {`${videoDetails?.teacher.fName} ${videoDetails?.teacher.lName}`}
            </p>
            <Link href={`/hub/teachers/${videoDetails?.teacherId}`}>
              <Button variant={"outline"}>{t("showProfile")}</Button>
            </Link>
          </section>

          <div className="md:w-8/12">
            <section
              id="description"
              className="bg-cardBg text-lightText p-4  mt-2 rounded-md 
      "
            >
              <h2 className=" text-center mt-4">{t("description")}</h2>
              <div
                className="px-5"
                dangerouslySetInnerHTML={{ __html: pureHTML }}
              />
            </section>
            <section
              className="bg-cardBg text-lightText p-4  mt-2 rounded-md 
      "
            >
              <h2>
                <SchoolIcon /> {t("lessons")}
              </h2>
              {verifiedCourse &&
                verifiedCourse?.length === 0 &&
                videoDetails?.price !== 0 && <p>{t("locked")}</p>}
              <div className="flex flex-col gap-2 mt-2">
                {videoDetails?.videoCourseSession
                  .sort((a, b) => a.index - b.index)
                  .map((lesson, index) => {
                    if (index < 3) {
                      return (
                        <Link href={`/hub/videos/${params.id}/${lesson.id}`}>
                          <div
                            key={index}
                            className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all "
                            style={{
                              unicodeBidi: "bidi-override",
                              direction: "ltr",
                            }}
                          >
                            <p>{lesson.title}</p>
                          </div>
                        </Link>
                      );
                    } else if (
                      (index > 2 &&
                        verifiedCourse &&
                        verifiedCourse.length > 0) ||
                      (registeredVideoCourse &&
                        registeredVideoCourse.length > 0) ||
                      currentUser?.role === "admin" ||
                      currentUser?.role === "adminTeacher"
                    ) {
                      return (
                        <Link href={`/hub/videos/${params.id}/${lesson.id}`}>
                          <div
                            key={index}
                            className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all "
                            style={{
                              unicodeBidi: "bidi-override",
                              direction: "ltr",
                            }}
                          >
                            <p>{lesson.title}</p>
                          </div>
                        </Link>
                      );
                    } else {
                      return (
                        <Link
                          href={`#`}
                          className="pointer-events-none
                         opacity-50"
                        >
                          <div
                            key={index}
                            className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all "
                            style={{
                              unicodeBidi: "bidi-override",
                              direction: "ltr",
                            }}
                          >
                            <p>{lesson.title}</p>
                          </div>
                        </Link>
                      );
                    }
                  })}
                {videoDetails?.videoCourseSession.length === 0 && (
                  <p>{t("noSessionYet")}</p>
                )}
              </div>
            </section>

            <section
              className="bg-cardBg text-lightText p-4  mt-2 rounded-md 
      "
            >
              <div className="flex justify-between">
                <h2 className="flex gap-2 items-center">
                  <ForumIcon />
                  {t("comments")}
                </h2>
                <Button onClick={() => setOpenComment(true)}>
                  {t("addNewComment")}
                </Button>
              </div>
              <div className={`animate-fadeIn ${openComment ? "" : "hidden"}`}>
                <AddComment
                  setOpenComment={setOpenComment}
                  isCourse={true}
                  isSession={false}
                  courseId={params.id}
                />
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {videoDetails?.Comment.sort(
                  (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
                ).map((comment, index) => {
                  if (comment.verified) {
                    return (
                      <div className="p-5 rounded-md bg-slate-200" key={index}>
                        <div className="flex gap-3 items-center">
                          <Avatar>
                            <AvatarImage
                              src={`${
                                comment.commentCreator.image ??
                                "https://github.com/shadcn.png"
                              }`}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p>
                              {`${comment.commentCreator.fName} ${comment.commentCreator.lName}`}{" "}
                            </p>
                            <p className="opacity-50">
                              {comment.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-2" />
                        <p>{comment.content}</p>

                        {comment.CommentAnswer.length > 0 && (
                          <div className="rounded-md p-4 bg-white mt-4">
                            <div className="flex gap-3 items-center">
                              <Avatar>
                                <AvatarImage
                                  src={`${
                                    comment.CommentAnswer[0]?.answerCreator
                                      .image ?? "https://github.com/shadcn.png"
                                  }`}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <p>
                                  {`${comment.CommentAnswer[0]?.answerCreator.fName} ${comment.CommentAnswer[0]?.answerCreator.lName}`}{" "}
                                </p>
                                <p className="opacity-50">
                                  {comment.CommentAnswer[0]?.createdAt.toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Separator className="my-2" />
                            {comment.CommentAnswer[0]?.content}
                          </div>
                        )}
                      </div>
                    );
                  }
                })}
                {videoDetails?.Comment.length === 0 && (
                  <p>{t("noCommentYet")}</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleVideo;
