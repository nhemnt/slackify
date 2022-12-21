import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

export function withSecretAuthentication(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const { authorization } = req.headers
    const isValid = authorization === `Bearer ${process.env.API_SECRET_KEY}`
    if (!isValid) {
      return res.status(403).end()
    }

    return handler(req, res)
  }
}
