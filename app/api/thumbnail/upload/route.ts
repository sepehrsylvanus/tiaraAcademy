import { getSingleUser } from "@/actions/userActions";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Parse the request body
    const body = (await request.json()) as HandleUploadBody;

    // Get the current user
    const user = await getSingleUser();

    // Check if user is authenticated
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!body) {
      return NextResponse.json(
        { error: "There isn't any body there" },
        { status: 404 }
      );
    }

    // Perform handleUpload with comprehensive configuration
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        console.log({ pathname });
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/jpg",
          ],
          maximumSizeInBytes: 1 * 1024 * 1024 * 1024,
          tokenPayload: JSON.stringify({
            userId: user.id,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          // Safely parse token payload
          // Add any additional logic for post-upload processing
        } catch (error) {
          console.error("Upload completion error:", error);
          throw new Error("Could not process uploaded file");
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
