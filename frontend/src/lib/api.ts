const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getItems() {
  const res = await fetch(`${API_URL}/read.php`);
  return await res.json();
}
