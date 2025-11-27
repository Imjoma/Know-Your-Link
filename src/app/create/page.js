"use client";

import { redirect, usePathname } from "next/navigation";

const CreatePage = () => {
  const pathname = usePathname();
  const isCreatePath = pathname === "/create";

  if (isCreatePath) {
    redirect("/");
  }
};

export default CreatePage;
