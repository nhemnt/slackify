import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withSecretAuthentication } from "@/lib/api-middlewares/with-secret-authentication"
import { BadRequestError, InternalError, MissingFieldError } from "@/lib/errors"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { WEBHOOK_URI } = process.env

    if (WEBHOOK_URI === null) {
      throw new MissingFieldError("Missing webhook URI")
    }
    const blocks = req?.body?.blocks || []

    try {
      if (Array.isArray(blocks) && blocks.length) {
        await axios.post(WEBHOOK_URI, {
          username: `Advent of Code`,
          icon_emoji: ":christmas_tree:",
          blocks: blocks,
        })
        return res.status(200).send({ response: "ok" })
      }
      throw new BadRequestError()
    } catch (_err) {
      // err contains sensitive info
      throw new InternalError()
    }
  }
}
export default withMethods(["POST"], withSecretAuthentication(handler))
