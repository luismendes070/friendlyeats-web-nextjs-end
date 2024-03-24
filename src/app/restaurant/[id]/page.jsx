import Restaurant from "@/src/components/Restaurant.jsx";
import { useUser } from "@/src/lib/firebase/auth";
import {
	getAuthenticatedAppForUser
} from "@/src/lib/firebase/firebase.js";



export const dynamic = "force-dynamic";

export default async function Home({ params }) {
	// This is a server component, we can access URL
	// parameters via Next.js and download the data
	// we need for this page
	const { currentUser } = await getAuthenticatedAppForUser()

	return (
		<main className="main__restaurant">
		</main>
	);
}
