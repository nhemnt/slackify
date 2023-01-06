

import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import { withMethods } from '@/lib/api-middlewares/with-methods';
import { withSecretAuthentication } from '@/lib/api-middlewares/with-secret-authentication';
import { InternalError } from '@/lib/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { ICONS } from './advent-of-code';
import { uploadImage } from '@/config/cloudinary';


const getMedal = (rank) => {
  switch(rank){
    case 1:
      return ICONS.FIRST_POSITION
    case 2: 
      return ICONS.SECOND_POSITION
    case 3:
        return ICONS.THIRD_POSITION
    default:
        return ICONS.PARTICIPATION
  }
}
const printIt = ({ name, topic, rank }) => {
  const canvas = createCanvas(1056, 816);
  const ctx = canvas.getContext("2d");
  return new Promise((resolve, reject) => {
    loadImage(process.cwd() + "/assets/certificate.png")
    .then((image) => {
      ctx.drawImage(image, 0, 0, 1056, 816);
      ctx.font = "bold 40pt cursive";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "#000";
      ctx.fillText(name, 1056 / 2, 430);

      ctx.font = "20pt cursive";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "#000";
      ctx.fillText(topic, 250, 680);

      loadImage(getMedal(rank)).then(async (image) => {
        ctx.drawImage(image, 460, 240, 120, 120);
        const buffer = canvas.toBuffer("image/png");
        // const result = await uploadImage(buffer, `${name}.png`)
       
        // result.name = name;

        // for local read out
        const fileName = name + Date.now()
        const result = {
          url: `http://localhost:3000/dist/${fileName}.png`,
          name
        }
        fs.writeFileSync(process.cwd()+ `/public/dist/${fileName}.png`, buffer);
        resolve(result);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  })
  
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const members = req?.body?.members || []
          const promises = [];
          try {
            for(let i =0; i< members.length; i++){
              const {name} = members[i];
              const image =  printIt({ name, topic: "Advent Of Code 2022", rank: i+1 });
              promises.push(image)
            }
            
            const data = await Promise.all(promises)
            return res.status(200).send({ response: "ok", data });
          } catch (_err) {
            // err contains sensitive info
            throw new InternalError();
          }
    }
  }


export default withMethods(["POST"], withSecretAuthentication(handler))
