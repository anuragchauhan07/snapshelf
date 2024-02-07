"use client";
import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { IoAddSharp } from "react-icons/io5";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { VscSignIn } from "react-icons/vsc";
import { BsSignIntersectionYFill } from "react-icons/bs";

function Header() {
  const [imageURL, setImageURL] = useState("");
  const [title, setTitle] = useState("");

  const publishPost = async () => {
    try {
      const apiUrl = "/api/post/create";
      const resImageURL = imageURL;
      const resTitle = title;
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resImageURL, resTitle }),
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(
          `Failed to post title: ${response.status} - ${response.statusText}`
        );
      }
      toast.success("Post Published");
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <header className="flex justify-between py-2 px-4 bg-gray-900 rounded-xl text-white items-center w-full">
      <Toaster />
      <div>
        <Link href="/">
          <BsSignIntersectionYFill className="text-3xl text-violet-600" />
        </Link>
      </div>


      <div className="flex items-center gap-4">
        <SignedIn>
          <Dialog>
            <DialogTrigger className="flex bg-black items-center gap-2 text-white rounded-sm text-sm  px-3 py-2 ">
              <IoAddSharp />
              Create
            </DialogTrigger>
            <DialogContent >
              <div className="flex flex-col gap-4">
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res[0].url);
                    setImageURL(res[0].url);
                    toast.success("Image Uploaded");
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                    toast.error(`ERROR ${error.message}`);
                  }}
                />

                <Input
                  type="text"
                  placeholder="Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <Button
                  variant="secondary"
                  className="bg-black text-white hover:bg-black/80 "
                  disabled={!title && !imageURL}
                  onClick={() => {
                    publishPost();
                  }}
                >
                  Publish Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="secondary" className="bg-black text-white hover:bg-gray-800">
              <VscSignIn className="mr-2" /> SignIn
            </Button>
          </Link>
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
