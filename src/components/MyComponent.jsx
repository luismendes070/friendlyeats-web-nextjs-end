// @next/env Gemini and ChatGPT
import { getConfig } from '@next/env';

export async function getServerSideProps(context) {
  // Get the value of the API_KEY environment variable
  const apiKey = getConfig().NEXT_PUBLIC_FIREBASE_API_KEY;

  // Use the API key in your application logic
  // For example, fetch data from an API using the API key
  const data = await fetch(`${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}?key=${apiKey}`);
  const jsonData = await data.json();

  // Pass data to the page component as props
  return {
    props: {
      data: jsonData,
    },
  };
}

// Example usage in a component
export default function MyComponent({ data }) {
  return (
    <div>
      {/* Display data fetched from the API */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
