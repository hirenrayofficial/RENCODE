import { useEffect, useRef, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { checkEditor } from "../editor/component/api/apiEditor";

export default function EProtuctedRoute({ children }) {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const id = searchParams.get("id");
    
    const hasRun = useRef(false);
    const [loading, setLoading] = useState(true);
    const [access, setAccess] = useState(false);

    useEffect(() => {
        // Prevent double execution in Strict Mode
        if (hasRun.current) return;
        hasRun.current = true;

        const verifyUser = async () => {
            try {
                if (!token || !id) {
                    setAccess(false);
                } else {
                    const res = await checkEditor(token, id);
                    if (res.status === 200) {
                        setAccess(true);
                    } else {
                        setAccess(false);
                    }
                }
            } catch (error) {
                setAccess(false);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, [token, id]);

    // 1. Show nothing (or a spinner) while checking authorization
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <p>Verifying Access...</p>
            </div>
        );
    }

    // 2. If check failed, redirect to login
    if (!access) {
        return <Navigate to="/login" replace />;
    }

    // 3. Only if access is true, render the protected children
    return children;
}