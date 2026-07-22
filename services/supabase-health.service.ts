export async function checkSupabaseHealth() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Supabase health failed ${response.status}`
      );
    }

    return await response.json();

  } catch(error) {

    console.error(
      "Supabase health check failed",
      error
    );

    return null;
  }
}