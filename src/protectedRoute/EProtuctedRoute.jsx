import { useEffect, useRef, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { checkEditor } from "../editor/component/api/apiEditor";
import { toast } from "sonner";
import "./loading.scss"; // Import your styles here

export default function EProtuctedRoute({ children }) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const hasRun = useRef(false);
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verifyUserWithDelay = async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        if (!token || !id) throw new Error("Missing credentials");

        // Runs both tasks simultaneously; completes in 2s minimum
        const [res] = await Promise.all([checkEditor(token, id), delay]);

        if (res.status === 200) {
          setAccess(true);
          return res;
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        setAccess(false);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    toast.promise(verifyUserWithDelay(), {
      loading: "Verifying your workspace...",
      success: "Identity confirmed.",
      error: "Redirecting to login...",
    });
  }, [token, id]);

  // Loading state with the new SCSS classes
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Preparing your editor...</p>
      </div>
    );
  }

  if (!access) {
    return <Navigate to="/login" replace />;
  }

  return children;
}