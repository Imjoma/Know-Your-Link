// Navigation
import { TbHomeFilled } from "react-icons/tb";
import { TbCalendarEvent } from "react-icons/tb";
import { TbPlus } from "react-icons/tb";
import { TbBellFilled } from "react-icons/tb";
import { TbUserFilled } from "react-icons/tb";
// ... Navigtation

// Action Cards
import { TbUserPlus } from "react-icons/tb";
import { TbCalendarStats } from "react-icons/tb";
import { TbNotes } from "react-icons/tb";
// ... Action Cards

// Choose Create
import { TbCalendarPlus } from "react-icons/tb";
import { TbCalendarUser } from "react-icons/tb";
import { TbCalendarMonth } from "react-icons/tb";
// ... Choose Create

export const navigation = [
  { id: 1, name: "Home", icon: TbHomeFilled, slug: "home" },
  { id: 2, name: "Meeting", icon: TbCalendarEvent, slug: "/meeting" },
  { id: 3, name: "Add", icon: TbPlus, slug: "?addMeeting=true" },
  { id: 4, name: "Notification", icon: TbBellFilled, slug: "/notification" },
  { id: 5, name: "Profile", icon: TbUserFilled, slug: "/profile" },
];

export const actions = [
  {
    id: 1,
    name: "New Meeting",
    desc: "Setup a virtual meeting",
    icon: TbPlus,
    slug: "?addMeeting=true",
    explanation: "Create a list of meetings that you can access anytime.",
    color: "#1E90FF",
  },
  {
    id: 2,
    name: "Join Meeting",
    desc: "Shared meeting links",
    icon: TbUserPlus,
    slug: "/meeting/join-meeting",
    explanation:
      "Join a group meeting schedules by asking or sending an invitation link.",
    color: "#32CD32",
  },
  {
    id: 3,
    name: "Create a Group",
    desc: "Manage your group members",
    icon: TbCalendarStats,
    slug: "/meeting/group-meeting",
    explanation: "Manage a group link and invite your members",
    color: "#FF8C00",
  },
  {
    id: 4,
    name: "Take Notes",
    desc: "Simple note taking tool",
    icon: TbNotes,
    slug: "/meeting/notes",
    explanation:
      "Quickly take some notes while your currently in a group call meeting.",
    color: "#6A5ACD",
  },
];

export const chooseCreateItems = [
  {
    id: 1,
    name: "Create a meeting link",
    icon: TbCalendarPlus,
    slug: "/personal-meeting",
  },
  { id: 2, name: "Make a group", icon: TbCalendarUser, slug: "/" }, // add members only
  { id: 3, name: "Schedule a meeting", icon: TbCalendarMonth, slug: "/" }, // notify and display
  // { id: 4, name: "Take notes" },
];
