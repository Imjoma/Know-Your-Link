import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session.user.email;
  console.log("Current user to get meetings: ", currentUserEmail);

  if (!session) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM meetinglinks WHERE email = ? ORDER BY `id` DESC";
    const [meetinglinks] = await db.query(sql, [currentUserEmail]);
    return NextResponse.json(meetinglinks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await request.json();

  const { subject, schedule, guest, link, code, creator, email } = body;

  try {
    const db = await createConnection();
    const sql =
      "INSERT INTO meetinglinks (subject, schedule, guest, link, code, creator, email) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.execute(sql, [
      subject,
      schedule,
      guest,
      link,
      code,
      creator,
      email,
    ]);

    return NextResponse.json(
      { message: "Created Successfully", result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  try {
    const db = await createConnection();
    const [result] = await db.execute("DELETE FROM meetinglinks WHERE id = ?", [
      id,
    ]);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const body = await request.json();

  const { id, subject, schedule, guest, link, code, creator } = body;
  const meetingId = id;

  try {
    const db = await createConnection();
    const sql = `
    UPDATE meetinglinks
    SET subject = ?, schedule = ?, guest = ?, link = ?, code = ?, creator = ?
    WHERE id = ?;
  `;
    const [result] = await db.execute(sql, [
      subject,
      schedule,
      guest,
      link,
      code,
      creator,
      meetingId,
    ]);
    return NextResponse.json(
      { message: "Updated Successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
