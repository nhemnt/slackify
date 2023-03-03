import axios from "axios"
import ogs from "open-graph-scraper";
import { NextApiRequest, NextApiResponse } from "next"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withSecretAuthentication } from "@/lib/api-middlewares/with-secret-authentication"
import { InternalError } from "@/lib/errors"

interface UrlData {
  url: string;
  title?: string;
}

interface JsonData {
  urls: UrlData[];
}

interface OGresult {
  error: boolean;
  result: any;
  response: any;
}
interface OpenGraphData {
  ogTitle?: string;
  ogUrl?: string;
  ogDescription?: string;
  ogImage?: { url: string } | Array<{ url: string }>;
  ogSiteName?: string;
  twitterImage?: { url: string };
  twitterDescription?: string;
  requestUrl?: string;
}

interface NormalizedOGData {
  title?: string;
  url?: string;
  description?: string;
  image?: string;
}


// This function normalizes the OpenGraph data
const normalizeOGData = (ogData: OpenGraphData): NormalizedOGData => {
  const {
    ogTitle,
    ogUrl,
    ogDescription,
    ogImage,
    twitterImage,
    twitterDescription,
    requestUrl,
  } = ogData;

  const image =
    (Array.isArray(ogImage) ? ogImage[0]?.url : ogImage?.url) ||
    twitterImage?.url;

  return {
    title: ogTitle,
    url: ogUrl || requestUrl,
    description: ogDescription || twitterDescription,
    image,
  };
};

/**
 * Creates Slack blocks based on the given normalized OG data.
 * @param data An array of NormalizedOGData objects
 * @returns An array of Slack block objects
 */
const createSlackBlocks = (data: NormalizedOGData[]) => {
  const blocks: any = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Stay Informed with the Top Stories of the Week 😎",
        emoji: true,
      },
    },
    {
      type: "divider",
    },
  ];
  data.forEach((item: NormalizedOGData) => {
    const { title, url, description, image } = item;
    if (title) {
      blocks.push({
        type: "header",
        text: {
          type: "plain_text",
          text: title,
          emoji: true,
        },
      });
    }

    if (image) {
      blocks.push({
        type: "image",
        title: {
          type: "plain_text",
          text: title,
          emoji: true,
        },
        image_url: image,
        alt_text: title,
      });
    }

    if (description) {
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: description,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Read More",
            emoji: true,
          },
          url: url,
        },
      });
    }

    blocks.push({
      type: "divider",
    });
  });
  return blocks;
};



/**
 * The handler function receives a request and response object and filters out unwanted data from JSON.
 * It then retrieves OpenGraph data for unique URLs and filters out unwanted domains.
 * Finally, it sends a response with the normalized OpenGraph data.
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const json: JsonData = req.body;
    const { WEBHOOK_URI } = process.env;
    const excludedList = JSON.parse(process.env.EXCLUDED_LIST || "") || [];
    const excludeDomain = JSON.parse(process.env.EXCLUDED_DOMAIN || "") || [];
    const regex = new RegExp(excludedList.join("|"), "i");
    const excludeDomainRegex = new RegExp(excludeDomain.join("|"), "i");
  
    // Filter out unwanted data from JSON
    const filteredList = json.urls.filter((str: UrlData) => {
      if (!str?.title) {
        return false;
      }
      return !regex.test(str.title);
    });
  
    try {
      const seenUrls = new Set<string>();
      const uniqueData = filteredList.filter((item: UrlData) => {
        if (seenUrls.has(item.url)) {
          return false;
        } else {
          seenUrls.add(item.url);
          return true;
        }
      });
  
      const promises: Promise<OGresult>[] = [];
      uniqueData.forEach((list: UrlData) => {
        const options = { url: list.url };
        promises.push(ogs(options));
      });
  
      Promise.allSettled(promises).then(async (results) => {
        const data: OpenGraphData[] = [];
        results.forEach((result) => {
          if (result.status === "fulfilled" && result.value.result) {
            data.push(result.value.result);
          }
        });
  
        // Filter out unwanted domains from OpenGraph data
        const filteredData = data.filter((str) => {
          const url = str.ogUrl || "";
          const siteName = str.ogSiteName || "";
          return !excludeDomainRegex.test(url || siteName);
        });
        const blocks = createSlackBlocks(filteredData.map(normalizeOGData));
  
        if (WEBHOOK_URI) {
          await axios.post(WEBHOOK_URI, {
            username: "Slackify",
            icon_emoji: ":meow_code:",
            blocks: blocks,
          });
        }
  
        // Send response with normalized OpenGraph data
        res.status(200).json({ result: blocks });
      });
    } catch (err: any) {
      // err contains sensitive info
      throw new InternalError(err);
    }
  }
}

export default withMethods(["POST"], withSecretAuthentication(handler))
