"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { getStudentWritings, getWritings } from "@/actions/actions";
import { useEffect, useState } from "react";
import { Writings } from "@/utils/types";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";

const MyWritings = () => {
  const [studentWriting, setStudentWriting] = useState<Writings[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("StudentHub");
  useEffect(() => {
    const getWritings = async () => {
      const myWritings = (await getStudentWritings()) as Writings[];

      setStudentWriting(myWritings);
      setLoading(false);
    };
    getWritings();
  }, []);

  return (
    <>
      <div className=" w-full mb-2 border-b border-dashed flex justify-end flex-row-reverse items-center md:justify-end">
        <h2 className="font-bold text-2xl">{t("myWritings")}</h2>
      </div>
      <div
        className={`${
          !loading &&
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        }  gap-4`}
      >
        {loading ? (
          <div className="w-full flex justify-center">
            <CircularProgress sx={{ color: "white" }} />
          </div>
        ) : (
          studentWriting.length > 0 &&
          studentWriting.map((eachWriting) => (
            <Card key={eachWriting.id} className="text-center">
              <CardHeader>
                <CardTitle>
                  {eachWriting.subject ? eachWriting.subject : "Uploaded file"}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center gap-2">
                {eachWriting.status === "checked" ? (
                  <div className="w-[15px] h-[15px] relative animate-pulse">
                    <Image
                      src={"/greenCircle.png"}
                      alt="checked status"
                      fill
                      className="absolute"
                    />
                  </div>
                ) : (
                  <div className="w-[15px] h-[15px] relative animate-pulse">
                    <Image
                      src={"/yellowCircle.png"}
                      alt="checked status"
                      fill
                      className="absolute"
                    />
                  </div>
                )}
                <p>{eachWriting.status}</p>
              </CardContent>
              <CardFooter className="w-full">
                <Link
                  href={`/hub/singleWriting/${eachWriting.id}`}
                  className={`w-full ${
                    eachWriting.status === "pending" && " pointer-events-none"
                  }`}
                >
                  <Button
                    className="w-full "
                    disabled={eachWriting.status === "pending"}
                  >
                    {t("view")}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      {!loading && studentWriting.length === 0 && (
        <p className="w-full ">
          {t("noWriting")}{" "}
          <Link
            href="/hub/writing/writeHere"
            className="text-extraText underline  hover:text-lightText transition"
          >
            {t("writeHere")}
          </Link>
        </p>
      )}
    </>
  );
};

export default MyWritings;
