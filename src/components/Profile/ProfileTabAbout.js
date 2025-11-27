import { signOut } from "next-auth/react";

const ProfileTabAbout = () => {
  return (
    <div>
      <footer>
        <button
          onClick={signOut}
          className="w-full p-4 text-white rounded-full bg-red-950"
        >
          Log Out
        </button>
      </footer>
    </div>
  );
};

export default ProfileTabAbout;
