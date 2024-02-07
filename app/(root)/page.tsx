"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaRobot } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Post() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentImage, setCurrentImage] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/post`, {
          next: { revalidate: 3600 },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch items: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error: any) {
        console.error(`Error fetching items: ${error.message}`);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main className="w-full flex flex-col gap-6 my-4 sm:my-10">
      <div className="bg-gray-900 p-10  sm:px-20 flex flex-col items-center text-center gap-6 rounded-xl gradient text-white">
        <p className="bg-black border rounded-xl text-sm px-6 py-2">
          The power of images 🚀
        </p>
        <p className="headingFont text-4xl sm:text-6xl ">
          Discover a new way to stay in touch
        </p>

        <p className="text-sm ">
          A unified hub for all you images that you want to share with the world{" "}
        </p>

        <SignedOut>
          <Link href="/sign-in">
            <Button
              variant="secondary"
              className="bg-black text-white hover:bg-black/80 "
            >
              Create your Post
            </Button>
          </Link>
        </SignedOut>
      </div>

      <div className="flex gap-4 items-center mt-10 ">
        <FaRobot className="text-4xl text-violet-600" />
        <div>
          <p className="font-semibold text-white">Community Posts</p>
          <p className="text-sm text-gray-400">See what other have shared</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2  w-full place-items-evenly">
        {posts.map((key) => {
          return (
            <Dialog>
              <DialogTrigger className="w-full ">
                <div
                  className="overflow-hidden rounded-xl border border-black  w-full "
                  onClick={() => {
                    setCurrentImage(key.imageUrl);
                    setCurrentTitle(key.title);
                  }}
                >
                  <Image
                    height={1000}
                    width={1000}
                    alt="img"
                    src={key.imageUrl}
                    className=" w-full h-48 object-cover rounded-xl hover:scale-105 duration-500 transition"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="bg-black text-white border-none">
                <Image
                  height={1000}
                  width={1000}
                  alt=""
                  src={currentImage}
                  className="w-full h-auto object-contain rounded-xl"
                />
                <p className="text-sm">{currentTitle}</p>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </main>
  );
}
