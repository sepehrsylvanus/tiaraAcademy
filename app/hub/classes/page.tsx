"use client";
import React, { useEffect, useState } from "react";
import styles from "./classes.module.css";
import {
  Chip,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
} from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import { CustomClassTextField } from "./styledComponents";

import { Class, User } from "@/utils/types";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Meteors } from "@/components/ui/meteors";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import { useEditClass, useGetClasses } from "@/hooks/useClasses";
import { useGetTeacherNames } from "@/hooks/useUsers";
import { useLocale, useTranslations } from "next-intl";
import {
  convertDaysToPersian,
  makeEnglishDaysUppercase,
} from "@/utils/helperFunctions";
import moment from "jalali-moment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
type Props = {
  searchParams: {
    teacher: string;
  };
};
const Classes = ({ searchParams: { teacher } }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [editingClass, setEditingClass] = useState<Class | null>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const t = useTranslations("Class");
  const locale = useLocale();
  const { data: classes, isLoading: classesLoading } = useGetClasses();
  const { mutate: editClass } = useEditClass();
  const { data: teachersName } = useGetTeacherNames();

  const [filteredClasses, setFilteredClasses] = useState(classes);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (classes) {
      setFilteredClasses(classes);
    }
  }, [classes]);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getSingleUser();
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    };
    fetchUser();
  }, []);

  // START FILTER DATA

  type FormInputs = {
    className: string;
    teacherName: string;
  };

  const { control, watch } = useForm<FormInputs>({
    defaultValues: {
      className: searchParams.get("className") || "",
      teacherName: searchParams.get("teacher") || "",
    },
  });
  const classNameInput = watch("className", "");
  const teacherNameInput = watch("teacherName", "");

  useEffect(() => {
    if (locale === "en") {
      if (classNameInput && teacherNameInput) {
        setFilteredClasses(
          classes?.filter(
            (cls) =>
              (cls.title.includes(classNameInput) &&
                cls.teacher.fName.includes(teacherNameInput)) ||
              cls.teacher.lName?.includes(teacherNameInput)
          )
        );
      } else if (classNameInput) {
        setFilteredClasses(
          classes?.filter((cls) => cls.title.includes(classNameInput))
        );
      } else if (teacherNameInput) {
        setFilteredClasses(
          classes?.filter(
            (cls) =>
              cls.teacher.fName.includes(teacherNameInput) ||
              cls.teacher.lName?.includes(teacherNameInput)
          )
        );
      } else {
        setFilteredClasses(classes);
      }
    } else {
      if (classNameInput && teacherNameInput) {
        setFilteredClasses(
          classes?.filter(
            (cls) =>
              (cls.persianTitle.includes(classNameInput) &&
                cls.teacher.fName.includes(teacherNameInput)) ||
              cls.teacher.lName?.includes(teacherNameInput)
          )
        );
      } else if (classNameInput) {
        setFilteredClasses(
          classes?.filter((cls) => cls.persianTitle.includes(classNameInput))
        );
      } else if (teacherNameInput) {
        setFilteredClasses(
          classes?.filter(
            (cls) =>
              cls.teacher.fName.includes(teacherNameInput) ||
              cls.teacher.lName?.includes(teacherNameInput)
          )
        );
      } else {
        setFilteredClasses(classes);
      }
    }
  }, [classNameInput, teacherNameInput]);

  // END FILTER DATA

  // START EDITING CLASS

  const handleEdit = (classInfo: Class) => {
    setEditingClass({ ...classInfo });
    setIsDialogOpen(true);
  };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", editingClass!.id);
    formData.append("title", editingClass!.title);
    formData.append("price", editingClass!.price);
    formData.append("discount", editingClass!.discount);
    if (editingClass) {
      editClass(formData);
      setIsDialogOpen(false);
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Class
  ) => {
    if (!editingClass) return;
    const value = e.target.value;
    setEditingClass((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  // ENFD OF EDITING CLASS

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.classesHeader}>
        <div className={styles.titleContainer}>
          <h4 className="h3">{t("tiaraAcc")}</h4>
          <h1 className="h1">{t("allClass")}</h1>
          <p>{t("description")}</p>
        </div>
        <div className={styles.searchBarContainer}>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <ClassIcon />
            </IconButton>
            <Controller
              name="className"
              control={control}
              render={({ field }) => (
                <CustomClassTextField {...field} label={t("className")} />
              )}
            />
          </div>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <SchoolIcon />
            </IconButton>
            <FormControl fullWidth>
              <Controller
                name="teacherName"
                control={control}
                render={({ field }) => (
                  <CustomClassTextField
                    {...field}
                    select
                    variant="outlined"
                    label={t("teacherName")}
                  >
                    <MenuItem value="">{t("withoutFilter")}</MenuItem>
                    {teachersName?.map((eachName, index) => (
                      <MenuItem key={index} value={eachName}>
                        {eachName}
                      </MenuItem>
                    ))}
                  </CustomClassTextField>
                )}
              />
            </FormControl>
          </div>
        </div>
      </div>
      <Divider sx={{ margin: "1em 0" }} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-[6em]">
        {classesLoading ? (
          <>
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
          </>
        ) : filteredClasses ? (
          <>
            {filteredClasses?.map((eachClass) => {
              let days = eachClass.days;
              const formattedDays = makeEnglishDaysUppercase(days);
              const ifHasDiscount =
                eachClass.discount && Number(eachClass.discount) > 0;
              return (
                <Card
                  key={eachClass.id}
                  className="text-center flex flex-col justify-between relative"
                >
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-2 right-2 hover:bg-accent ${
                          currentUser?.role === "student" ? "hidden" : ""
                        }`}
                        onClick={() => handleEdit(eachClass)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit class</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Class</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSave} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Class Name</Label>
                          <Input
                            id="name"
                            value={editingClass?.title ?? ""}
                            onChange={(e) => handleInputChange(e, "title")}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="price">Price</Label>
                          <Input
                            id="price"
                            step="0.01"
                            min="0"
                            value={editingClass?.price ?? 0}
                            onChange={(e) => handleInputChange(e, "price")}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="discount">Discount (%)</Label>
                          <Input
                            id="discount"
                            min="0"
                            max="100"
                            value={editingClass?.discount ?? 0}
                            onChange={(e) => handleInputChange(e, "discount")}
                          />
                        </div>
                        <div className="flex gap-4 justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Save Changes</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <CardHeader>
                    {locale === "en" ? (
                      <CardTitle>{eachClass.title}</CardTitle>
                    ) : (
                      <CardTitle>{eachClass.persianTitle}</CardTitle>
                    )}
                  </CardHeader>
                  <CardContent className=" relative overflow-hidden">
                    <Meteors />
                    <p className="text-lg font-bold text-green-500">
                      {ifHasDiscount &&
                        `${eachClass.discount}% ${t("discountAdded")}`}
                    </p>
                    <div className="flex items-center justify-around gap-4">
                      <p>{`${eachClass.teacher!.fName} ${
                        eachClass.teacher?.lName
                      }`}</p>

                      <div className="flex flex-col">
                        <p
                          className={
                            ifHasDiscount ? "line-through text-red-500" : ""
                          }
                        >
                          {eachClass.price}
                        </p>
                        {ifHasDiscount && (
                          <p>
                            {Number(eachClass.price) -
                              Number(eachClass.price) *
                                (Number(eachClass.discount) / 100)}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Chip label={eachClass.type} />
                      </div>
                    </div>

                    <p className=" font-semibold mt-2">
                      {locale === "en"
                        ? formattedDays
                        : convertDaysToPersian(days) ||
                          "There is no dedicated day for this class"}
                    </p>

                    {eachClass.duration.length > 0 && (
                      <p className="mt-2">
                        {locale === "en"
                          ? `${new Date(
                              eachClass.duration[0]
                            ).toLocaleDateString()} | ${new Date(
                              eachClass.duration[1]
                            ).toLocaleDateString()}`
                          : `${moment(eachClass?.duration[0])
                              .locale("fa")
                              .format("YYYY/MM/DD")} - ${moment(
                              eachClass?.duration[1]
                            )
                              .locale("fa")
                              .format("YYYY/MM/DD")}`}
                      </p>
                    )}
                    {eachClass.date && <p>{`${eachClass.date.getDay()}`}</p>}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Link
                      href={`/hub/classes/${eachClass.id}`}
                      className="w-full"
                    >
                      <Button className="w-full">Join</Button>
                    </Link>

                    {(currentUser?.role.includes("admin") ||
                      currentUser?.role.includes("adminTeacher") ||
                      currentUser?.role.includes("teacher")) && (
                      <p
                        className=" cursor-pointer text-lg transition-all md:text-base md:hover:text-lg"
                        onClick={() => copyToClipboard(eachClass.id)}
                      >
                        {eachClass.id}
                      </p>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </>
        ) : (
          <p>There is an error in server</p>
        )}
      </div>
    </div>
  );
};

export default Classes;
