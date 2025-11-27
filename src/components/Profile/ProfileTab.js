import { useEffect, useState } from "react";
import ProfileTabLinks from "./ProfileTabLinks";
import ProfileTabAbout from "./ProfileTabAbout";

const ProfileTab = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tab, setTab] = useState({
    items: ["Links", "Groups", "Notes", "About"],
    selected: "Links",
  });

  const isLinks = tab.selected === "Links";
  const isGroups = tab.selected === "Groups";
  const isNotes = tab.selected === "Notes";
  const isAbout = tab.selected === "About";

  // Dont run on change Tab
  useEffect(() => {
    GetAllMeetings();
  }, []);

  const GetAllMeetings = async () => {
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

  console.log(meetings);

  return (
    <>
      {/* Profile Tab Toggler */}
      <div className="flex flex-row gap-1 text-sm">
        {tab.items.map((item, idx) => {
          const isSelected =
            tab.selected === item
              ? "bg-blue-950"
              : "opacity-60 hover:opacity-100 font-light";

          return (
            <button
              onClick={() => setTab((prev) => ({ ...prev, selected: item }))}
              key={item}
              className={`${isSelected} px-4 py-2 rounded-lg`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Profile Tab Display */}
      {loading ? (
        "Loading"
      ) : error ? (
        <div>Error: {error}</div>
      ) : meetings.length === 0 ? (
        "No meetings available"
      ) : (
        isLinks && <ProfileTabLinks meetings={meetings} />
      )}
      {isGroups && "Groups feature: not available"}
      {isNotes && "Notes feature: not available"}
      {isAbout && <ProfileTabAbout />}
    </>
  );
};

export default ProfileTab;
