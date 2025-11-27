"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreateMeetingPage = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    subject: "",
    schedule: "",
    guest: "",
    code: "",
    link: "",
    creator: session.user.username,
    email: session.user.email,
  });

  console.log(session);

  const router = useRouter();

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { subject, schedule, guest, link, code, creator, email } = formData;

    try {
      const res = await fetch(`/api/meetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          schedule,
          guest,
          link,
          code,
          creator,
          email,
        }),
      });
      if (res.ok) {
        router.push("/meeting?refreshed=true");
      } else {
        // Handle error response
        const errorData = await res.json();
        console.error("Error:", errorData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Guest</label>
          <input
            type="text"
            name="guest"
            value={formData.guest}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Schedule</label>
          <input
            type="text"
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Link</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default CreateMeetingPage;
