import React from "react";
import { BsSignIntersectionYFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-gray-900 rounded-xl text-white px-4 py-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <BsSignIntersectionYFill className="text-3xl text-white" />
        <div>
          <p className="tracking-wider">SnapShelf</p>
          <p className="text-sm text-gray-300">A Next js project </p>
        </div>
      </div>
      <div className="flex text-xl gap-4">
        <Link
          href="https://github.com/anuragchauhan07"
          className="bg-gray-600 flex gap-2 p-2 rounded-sm hover:bg-gray-600/80 cursor-pointer transition"
        >
          <FaGithub />
          <p className="sm:block hidden text-sm">Give a star</p>
        </Link>
        <Link
          href="https://www.linkedin.com/in/anuragchauhan07/"
          className="bg-blue-600 p-2 rounded-sm hover:bg-blue-600/80 cursor-pointer transition"
        >
          <FaLinkedinIn />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
