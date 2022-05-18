import { getBiz } from '../../lib/api'

export default async function preview(req, res) {
  const { business } = req.query;

  // Fetch WordPress to check if the provided `id` or `slug` exists
  const biz = await getBiz(business);

  // If the post doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Business not found' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    biz: {
      id: biz.id,
      slug: biz.username,
      status: biz.name,
    },
  })

  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${business}` })
  res.end()
}