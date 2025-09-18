import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export async function logoutAndRedirect(navigate) {
  try {
    await signOut(auth);
    navigate("/"); // landing gate
  } catch (err) {
    console.error("Logout failed:", err);
    navigate("/"); // fallback
  }
}
