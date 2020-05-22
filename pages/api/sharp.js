const sharp = require("sharp");
const chalk = require("chalk");
import multer from "multer";
import nextConnect from "next-connect";
const handler = nextConnect();

import connectDb from "../../u/connectDb";
connectDb();

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  //other options fileFilter etc.
});

//HANDLERS
handler.post(upload.single("productImage"), async (req, res) => {
  let profilePicture;
  console.log(req.query);

  if (req.file) {
    const { file } = req;
    console.log("FILE -> ", req.file);
    console.log("ID -> " + req.body._id);

    // const ext = file.mimetype.split("/")[1];
    const filename = `${file.fieldname}-${req.query._id}.${"jpeg"}`;

    // profilePicture = await sharp(file.buffer)
    //   .resize(200, 200)
    //   .jpeg({ quality: 90 })
    //   .toFormat("jpeg")
    //   .toFile("test.jpeg");

      profilePicture = await sharp(file.buffer)
      .resize(200, 200)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer(() =>
        console.log(chalk.green("Image transformed and saved successfully!"))
      );

    // .toBuffer( (err, data, info) => { buf = data  } )
    // .toFormat('png')
    //   `${process.env.ROOT}/public/img/products/${filename}`, () =>
    //   console.log(chalk.green("Image transformed and saved successfully!"))
    // );
    // console.log(bufferSharp)
  }
  const buffer = img.options.input.buffer;

  console.log("TRANSFORMED -> ", buffer);
  res.status(200).json(buffer);
});

export default handler;

// img = await sharp(file.buffer)
// .resize(200, 200)
// .toFormat("jpeg")
// .jpeg({ quality: 90 })
// .toBuffer(() =>
//   console.log(chalk.green("Image transformed and saved successfully!"))
// );
// }
// const buffer = img.options.input.buffer;
