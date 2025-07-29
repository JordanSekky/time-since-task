// Utility to get the current user's identity for task completion
// In production, this should be set by the server using Tailscale headers
// In development, returns anonymous values

import { getRequestEvent } from "solid-js/web";

export interface UserIdentity {
    login: string | null;
    name: string | null;
    profilePic: string | null;
}

// In a real deployment, you would inject these values from the server
// For now, we use anonymous in dev
export async function getCurrentUserIdentity(): Promise<UserIdentity> {
    "use server";
    const h = getRequestEvent()?.request.headers
    if (!h) {
        return {
            login: null,
            name: null,
            profilePic: null,
        };
    }
    const login = h.get("Tailscale-User-Login");
    const name = h.get("Tailscale-User-Name");
    const profilePic = h.get("Tailscale-User-Profile-Pic");
    return {
        login,
        name,
        profilePic,
    };
} 