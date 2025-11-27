"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EditMeetingPage = ({ setMeetings, item, setEdit, setOption }) => {
  const [formData, setFormData] = useState({
    id: item.id,
    subject: item.subject,
    schedule: item.schedule,
    guest: item.guest,
    code: item.code,
    link: item.link,
    creator: item.creator,
    email: item.email,
  });

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

    const { id, subject, schedule, guest, link, code, creator, email } =
      formData;

    try {
      const res = await fetch(`/api/meetings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
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
        setMeetings((prev) =>
          prev.map((item) => (item.id === id ? formData : item))
        );

        setEdit(false);
        setOption(false);
      } else {
        // Handle error response
        const errorData = await res.json();
        console.error("Error:", errorData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        router.push("/meeting");
      }, 1000);
    }
  };
  return (
    <main className="p-6">
      <div className="pb-6">
        <button onClick={() => setEdit(false)}>Back</button>
      </div>
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
          className="px-4 py-2 text-white bg-green-500 rounded"
        >
          Update
        </button>
      </form>
    </main>
  );
};

export default EditMeetingPage;
