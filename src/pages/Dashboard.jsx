import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NeoProblemExplorer from "../components/NeoProblemExplorer";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) setUser(u);
      else navigate("/login");
    });
    return () => unsub();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      

      {/* Explorer */}
      <NeoProblemExplorer />
    </div>
  );
}
