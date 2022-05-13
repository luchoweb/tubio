import { useState, useEffect } from 'react';

const Business = ({ biz }) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(biz)
    if ( biz ) {
      setLoading(false);
    }
  }, [biz]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : !biz.message ? (
          <div>Business: {biz.username}</div>
        ) : (
          <p>{biz.message}</p>
        )
      }
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:4000/business/@${context.query.business}`)
  const biz = await res.json();
  return { props: { biz } }
}

export default Business;