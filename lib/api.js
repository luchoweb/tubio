const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBiz(business) {
  const res = await fetch(`${API_URL}/business/@${business}`);
  const biz = await res.json();
  return biz;
}

export async function getBizById(id) {
  const res = await fetch(`${API_URL}/business/${id}`);
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

// POST
export async function saveBiz(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  return fetch(`${API_URL}/business`, requestOptions)
    .then(response => response.json())
    .then(data => data);
}

// PUT
export async function updateBiz(data) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  return fetch(`${API_URL}/business/${data.id}`, requestOptions)
    .then(response => response.json())
    .then(data => data);
}