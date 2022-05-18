const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPreviewBiz(business) {
  const res = await fetch(`${API_URL}/business/@${business}`);
  const biz = await res.json();
  return biz;
}

export async function getAllBiz() {
  const res = await fetch(`${API_URL}/business`);
  const bizs = await res.json();
  return bizs;
}