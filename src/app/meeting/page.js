"use client";

import MeetingItems from "@/components/Meeting/MeetingItems";
import MeetingOption from "@/components/Meeting/MeetingOption";
import Searchbar from "@/components/Meeting/Searchbar";
import { redirect, useSearchParams } from "next/navigation";

import EditMeetingPage from "@/components/Meeting/MeetingEdit";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const MeetingPage = () => {
  const [option, setOption] = useState(false);
  const [edit, setEdit] = useState(false);

  const { data: session, status } = useSession();

  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const refreshed = searchParams.get("refreshed");

  useEffect(() => {
    GetAllMeetings();
  }, [refreshed]);

  const GetAllMeetings = async () => {
    if (!status === "loading") return;
    try {
      const res = await fetch("/api/meetings", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch meetings");
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setMeetings(data);
      } else {
        setMeetings([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (edit) {
    return (
      <EditMeetingPage
        setMeetings={setMeetings}
        item={edit}
        setEdit={setEdit}
        setOption={setOption}
      />
    );
  }
  const handleSignOut = () => {
    const domain = window.location.origin;
    signOut({ callbackUrl: `${domain}/profile/login` });
  };

  // const meetings = [
  //   {
  //     id: 1,
  //     subject: "Software Engineer Interview",
  //     schedule: "Oct. 2 - 11:30am",
  //     guest: "Mr. Dante Lazo - Seansoft Corporation",
  //     link: "https://web.skype.com",
  //     code: "dante.b.lazo",
  //     onboard: "Joma Ipio",
  //   },
  // ];

  return (
    <>
      {!session ? (
        <h1>No Profile</h1>
      ) : (
        <main className="pb-20 space-y-8">
          <button onClick={handleSignOut}>signOut</button>
          {/* Option component */}

          <MeetingOption
            setMeetings={setMeetings}
            setOption={setOption}
            option={option}
            setEdit={setEdit}
          />

          {/* ... Option component */}
          <div className="px-4">
            <Searchbar />
          </div>
          <section className="px-4 space-y-3">
            <h3 className="text-lg font-semibold">Meeting Links</h3>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {loading ? (
                "Loading..." // Display loading text while fetching data
              ) : error ? (
                <div>Error: {error}</div> // Display error message if there is an error
              ) : meetings.length === 0 ? (
                "No meetings available" // Display message if no meetings are returned
              ) : (
                meetings.map((item, id) => {
                  return (
                    <li className="p-5 rounded-lg bg-[#222222] " key={item.id}>
                      <MeetingItems item={item} setOption={setOption} />
                    </li>
                  );
                })
              )}
            </ul>
          </section>
        </main>
      )}
    </>
  );
};

export default MeetingPage;
