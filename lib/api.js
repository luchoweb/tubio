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

export async function getStatsBiz(bizId) {
  const res = await fetch(`${API_URL}/stats/${bizId}`);
  const stats = await res.json();
  return stats;
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

export async function getTransactionDetails(ref) {
  const myTokenHeaders = new Headers();
  myTokenHeaders.append("Content-Type", "application/json");
  myTokenHeaders.append("Authorization", `Basic ${Buffer.from("907030f2a679f3e785f4209ac0462f6d:a0f596cc1f2370ad1a0e1ebe06e82edd", "utf-8").toString("base64")}`);

  const requestOptions = {
    method: 'POST',
    headers: myTokenHeaders,
    body: "",
    redirect: 'follow'
  };

return fetch("https://apify-private.epayco.co/login", requestOptions)
  .then(response => response.text())
  .then(result => {
    const { token } = JSON.parse(result);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json; charset=utf8");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      "filter": {
        "referencePayco": ref
      }
    });
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    
    return fetch("https://apify-private.epayco.co/transaction/detail", requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .catch(error => console.log('error', error));
  })
  .catch(error => console.log('error', error));
}