import { session$ } from "../observables/session-observable";

export const getImageUrl = async (dogId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-dog-image`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session$.get().access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ dogId })
  });

  const { url, error } = await response.json();
  if (error) throw new Error(error);

  return url;
}
