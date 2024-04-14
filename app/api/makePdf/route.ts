import { NextRequest, NextResponse } from "next/server";
import html2canvas from "html2canvas";
import { S3 } from "aws-sdk";
type PdfDataProps = {
  values: {
    band: string;
    writing: string;
  };
};

export const POST = async (req: NextRequest) => {
  const pdfData: PdfDataProps = await req.json();
  const band = pdfData.values.band;
  const writing = pdfData.values.writing;

  return NextResponse.json({ message: "PDF made" });
};
