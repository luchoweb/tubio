const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPreviewBiz(business) {
  const res = await fetch(`${API_URL}/business/@${business}`);

  const biz = await res.json();

  if (biz.message) {
    console.error(biz.message);
    throw new Error('Failed to fetch API')
  }

  return biz;
}


export async function getAllBiz() {
  const res = await fetch(`${API_URL}/business`);

  const bizs = await res.json();

  if (bizs.message) {
    console.error(bizs.message);
    throw new Error('Failed to fetch API')
  }

  return bizs;
}