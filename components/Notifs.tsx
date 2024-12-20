"use client";
import React from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Badge from "@mui/material/Badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  formatDateToStandard,
  formatTimeFromNow,
} from "@/utils/helperFunctions";
import { NotifType } from "@prisma/client";
import { useGetNotifs, useReadNotif } from "@/hooks/useNotifs";
import { useTranslations } from "next-intl";
import Link from "next/link";
const Notifs = () => {
  const t = useTranslations("Hub");
  const { data: notifs } = useGetNotifs();
  const { mutate: readNotif } = useReadNotif();
  return (
    <Popover>
      <PopoverTrigger>
        <Badge badgeContent={notifs?.length} color="primary">
          <NotificationsNoneOutlinedIcon color="action" />
        </Badge>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[400px] animate-slide-in-right bg-background shadow-lg border rounded-lg bg-white"
      >
        <div className="p-4 space-y-4">
          {notifs?.map((notif, index) => {
            if (index < 3) {
              return (
                <div
                  key={index}
                  className="cursor-pointer flex items-center justify-between gap-3  hover:bg-extraItem transition-all  p-2 rounded-md duration-300"
                  onClick={() => readNotif(notif.id)}
                >
                  <div className="bg-muted rounded-md flex items-center justify-center p-2">
                    {notif.type === NotifType.joinClass ? (
                      <UserPlusIcon className="w-5 h-5" />
                    ) : (
                      <UserCheckIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDateToStandard(notif.createdAt)}
                    </p>
                    <p>{notif.cls?.title}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-blue-500" />
                </div>
              );
            }
          })}
          {notifs?.length === 0 && (
            <p className="text-center">{t("noNotif")}</p>
          )}
        </div>
        <div className="flex justify-center">
          <Link
            href="/hub/notifications"
            className="  text-extraText underline"
          >
            {t("viewNotifs")}
          </Link>{" "}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifs;

function UserCheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

function UserPlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}
