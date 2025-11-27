import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createConnection } from "@/lib/db";

export async function POST(req, res) {
  // Request interaction
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "Incomplete credentials" },
      { status: 401 }
    );
  }

  try {
    // Database interaction
    const db = await createConnection();
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(sql, [email]);
    if (rows.length === 0 && rows.includes(email)) {
      return NextResponse.json(
        { message: "Gmail already have an account." },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insert =
      "INSERT INTO users (username, email, password) VALUES (?,?,?)";
    const [result] = await db.execute(insert, [
      username,
      email,
      hashedPassword,
    ]);

    return NextResponse.json(
      { message: "Created Successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
