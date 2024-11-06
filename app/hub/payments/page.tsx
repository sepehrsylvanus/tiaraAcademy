"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetUser } from "@/hooks/useUsers";
import { useGetMyPayments } from "@/hooks/usePayments";
import { useLocale, useTranslations } from "next-intl";
import moment from "jalali-moment";

interface Payment {
  id: number;
  date: string;
  amount: number;
  status: string;
  description: string;
}

export default function Payments() {
  const [search, setSearch] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof Payment>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { data: currentUser, isLoading: currentUserLoading } = useGetUser();
  const { data: payments } = useGetMyPayments(currentUser?.id!);
  const t = useTranslations("Payments");
  if (payments) {
    console.log(payments);
  }
  const locale = useLocale();
  console.log("type of payment", typeof payments);
  const filteredPayments = useMemo(() => {
    return payments?.filter(
      (payment) =>
        payment.date?.toString().includes(search) ||
        payment.price.toString().includes(search) ||
        payment.class?.title.includes(search)
    );
    //   .sort((a, b) => {
    //     if (a[sortColumn] < b[sortColumn])
    //       return sortDirection === "asc" ? -1 : 1;
    //     if (a[sortColumn] > b[sortColumn])
    //       return sortDirection === "asc" ? 1 : -1;
    //     return 0;
    //   });
  }, [search, sortColumn, sortDirection, payments]);

  const handleSort = (column: keyof Payment) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{t("payments")}</h1>
      <div className="mb-6">
        <Input
          placeholder="Search payments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("date")}
              >
                {t("date")}
                {sortColumn === "date" && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                {t("price")}
                {sortColumn === "amount" && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                {t("status")}
                {sortColumn === "status" && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                  </span>
                )}
              </TableHead>
              <TableHead>{t("reasone")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments?.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="rtl:text-end">
                  {locale === "fa" ? (
                    <p>
                      {moment(payment.date?.toLocaleDateString())
                        .locale("fa")
                        .format("YYYY/MM/DD")}
                    </p>
                  ) : (
                    <p>{payment.date?.toLocaleDateString()}</p>
                  )}
                </TableCell>
                <TableCell className="rtl:text-end">
                  {payment.price.toFixed(2)}
                </TableCell>
                <TableCell className="rtl:text-end">
                  <Badge variant={payment.payed ? "successful" : "destructive"}>
                    {payment.payed ? t("payed") : t("notPayed")}
                  </Badge>
                </TableCell>
                <TableCell className="rtl:text-end">
                  {payment.class?.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
