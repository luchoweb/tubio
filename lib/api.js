const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBiz(business) {
  const res = await fetch(`${API_URL}/business/@${business}`);
  const biz = await res.json();
  return biz;
}

export async function getAllBiz() {
  const res = await fetch(`${API_URL}/business`);
  const bizs = await res.json();
  return bizs;
}

export async function getFreeBiz(uid) {
  const res = await fetch(`${API_URL}/business/uid/${uid}`);
  const bizs = await res.json();
  const freeBiz = bizs.businesses.filter(biz => biz.is_free > 0).length;

  return freeBiz;
}

export async function getCountAllBiz(bizId) {
  const res = await fetch(`${API_URL}/business/count-uid/${bizId}`);
  const count = await res.json();
  return count;
}

export async function getAllBizByUid(uid) {
  const res = await fetch(`${API_URL}/business/uid/${uid}`);
  const bizs = await res.json();
  return bizs;
}