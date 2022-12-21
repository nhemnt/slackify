import axios from 'axios'
import cookie from 'cookie'
import lodash from 'lodash'
import { NextApiRequest, NextApiResponse } from "next"
import { withMethods } from '@/lib/api-middlewares/with-methods'
import { withSecretAuthentication } from '@/lib/api-middlewares/with-secret-authentication'
import { InternalError, MissingFieldError } from '@/lib/errors'

export const ICONS = {
    FIRST_POSITION: 'https://cdn-icons-png.flaticon.com/512/3975/3975625.png',
    SECOND_POSITION: 'https://cdn-icons-png.flaticon.com/512/3975/3975628.png',
    THIRD_POSITION: 'https://cdn-icons-png.flaticon.com/512/3975/3975631.png',
    PARTICIPATION: 'https://cdn-icons-png.flaticon.com/512/179/179251.png',
  }
  
  const getStars = (count) => {
    if (!count) return ''
  
    return [...new Array(count)].reduce((acc, curr) => {
      return `${acc}:star: `
    }, '')
  }
  
  const getMedal = (index, stars) => {
    if (index > 2 || stars < 1) return {}
    let url = ''
    switch (index) {
      case 0:
        url = ICONS.FIRST_POSITION
        break
      case 1:
        url = ICONS.SECOND_POSITION
        break
      case 2:
        url = ICONS.THIRD_POSITION
    }
  
    return {
      accessory: {
        type: 'image',
        image_url: url,
        alt_text: `${index + 1} position`,
      },
    }
  }
  const formatDate = (date) => {
    if (!date) return ''
    return new Date(date * 1000).toLocaleDateString()
  }
  
  const divider = {
    type: 'divider',
  }
  const createBlocks = (members, url, org, boardCode) => {
    const blocks = []
    // blocks.push({
    //   type: 'section',
    //   text: {
    //     type: 'plain_text',
    //     text: `${org ? org : ''} :christmas_tree: Advent of Code Leaderboard`,
    //     emoji: true,
    //   },
    // });
    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'image',
          image_url: 'https://adventofcode.com/favicon.png',
          alt_text: 'advent of code',
        },
        {
          type: 'mrkdwn',
          text: `<${url}|*Join the ${org} board*> *${boardCode}*`,
        },
      ],
    })
  
    blocks.push(divider)
  
    members.forEach(({ name, stars, last_star_ts, local_score }, index) => {
      const lastStarDate = formatDate(last_star_ts)
      const starStr = getStars(stars)
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${name}*\n*${local_score}*  :points: ${
            starStr ? '\n' + starStr : ''
          }${lastStarDate ? '\n*Last start won* -' + lastStarDate : ''}`,
        },
        ...getMedal(index, stars),
      })
  
      blocks.push(divider)
    })
  
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:arrow_right: <${url}|*View online leaderboard*> :arrow_left:`,
      },
    })
  
    return blocks
  }
  
  const ADVENT_OF_CODE_EVENT_END = {
    MONTH: 12,
    DATE: 26,
  }
  
  const createCertificateBlocks = (urls) => {
    const blocks = []
    urls.forEach(({ name, url }, rank) => {
      blocks.push({
        type: 'image',
        title: {
          type: 'plain_text',
          text: `Congratulations ${name} 🎊`,
          emoji: true,
        },
        image_url: url,
        alt_text: `${name} - ${rank} position certificate`,
      })
      blocks.push(divider)
    })
  
    return blocks
  }
  
  function isEventOver() {
    const now = new Date()
    return (
      now.getMonth() == ADVENT_OF_CODE_EVENT_END.MONTH &&
      now.getDate() == ADVENT_OF_CODE_EVENT_END.DATE
    )
  }
  const generateCertificate = async (members) => {
    if (!isEventOver()) return
    const { WEBHOOK_URI } = process.env
  
    if (WEBHOOK_URI === null) {
      throw new MissingFieldError('Missing webhook URI')
    }
  
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/certificate`,
      {
        members: members.map(({ name, stars }) => ({ name, stars })),
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
      }
    )
  
    const urls = data?.data?.data
  
    if (!(Array.isArray(urls) && urls.length)) return
  
    const certificates = createCertificateBlocks(urls)
    await axios.post(WEBHOOK_URI, {
      username: `Advent of Code Leaderboard`,
      icon_emoji: ':christmas_tree:',
      blocks: certificates,
    })
  }

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        const {
            LEADERBOARD_ID,
            SESSION_ID,
            WEBHOOK_URI,
            YEAR,
            ORGANISATION,
            BOARD_CODE,
          } = process.env

          if (LEADERBOARD_ID === null) {
            throw new MissingFieldError('Missing leaderboard ID')
          }
        
          if (SESSION_ID === null) {
            throw new MissingFieldError('Missing session ID')
          }
        
          if (WEBHOOK_URI === null) {
            throw new MissingFieldError('Missing webhook URI')
          }
        
          if (BOARD_CODE === null) {
            throw new MissingFieldError('Missing Private Board Code')
          }

          const year = YEAR || new Date().getFullYear()

          const url = `https://adventofcode.com/${year}/leaderboard/private/view/${LEADERBOARD_ID}`
        
          try {
            const response = await axios.get(`${url}.json`, {
              headers: { cookie: cookie.serialize('session', SESSION_ID) },
            })
        
            const members = lodash.orderBy(
              response.data.members,
              ['local_score', 'stars'],
              ['desc']
            )
        
            // https://app.slack.com/block-kit-builder/T026NT2D4
            const blocks = createBlocks(members, url, ORGANISATION, BOARD_CODE)
            await axios.post(WEBHOOK_URI, {
              username: `Advent of Code Leaderboard ${
                ORGANISATION ? '| ' + ORGANISATION : ''
              } `,
              icon_emoji: ':christmas_tree:',
              blocks,
            })
        
            generateCertificate(members)
            return res.status(200).send({ response: 'ok' })
          } catch (_err) {
            // err contains sensitive info
            throw new InternalError()
          }
    }
}
export default withMethods(["POST"], withSecretAuthentication(handler))
