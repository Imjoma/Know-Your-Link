import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret"; // Replace with your actual secret key

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { username: user.username },
    JWT_SECRET,
    { expiresIn: "15m" } // Access token expires in 15 minutes
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    JWT_SECRET,
    { expiresIn: "7d" } // Refresh token expires in 7 days
  );
  return { accessToken, refreshToken };
};
