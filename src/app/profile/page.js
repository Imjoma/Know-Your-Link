"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { TbArrowLeft } from "react-icons/tb";
import ProfileTab from "@/components/Profile/ProfileTab";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return "Loading";
  }

  if (!session) {
    redirect("/profile/login");
  }

  return (
    <main className="px-4 pb-20 space-y-6">
      {/* Navigation */}
      <button className="flex flex-row items-center gap-2 text-xl">
        <p>
          <TbArrowLeft />
        </p>
        <p>{session.user.username}</p>
      </button>
      {/* Profile Main Info */}
      <div className="flex flex-col gap-2">
        <div className="w-20 h-20 border rounded-full ">
          <img src={session.user.image} alt="" />
        </div>
        <div>
          <div>{session.user.username}</div>
          <div>{session.user.email}</div>
        </div>
      </div>
      <ProfileTab />
    </main>
  );
};

export default ProfilePage;
