import { IncomingForm } from 'formidable';
import fs, { promises } from 'fs';

const webp = require("webp-converter");
const mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()
    
    form.parse(req, (err, fields, files) => {
        if (err) return reject(err)

        const oldPath = files.file.filepath;
        const dir = `./public/uploads/${fields.username}`;
        
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, { recursive: true });
        }

        const result = webp.cwebp(oldPath, `${dir}/avatar.webp`,"-q 90");
        result.then((response) => {
          res.status(200).json({ fields, files });
        });

    })
  })
    
}