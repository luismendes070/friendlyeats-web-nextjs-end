"use server";

import { getAuthenticatedAppForUser } from "@/src/lib/firebase/firebase";

// This is a next.js server action, an alpha feature, so
// use with caution
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
export async function handleReviewFormSubmission(data) {
	const { app } = await getAuthenticatedAppForUser();
}
