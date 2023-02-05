const OpenAi = require("openai");
const { Configuration, OpenAIApi } = OpenAi;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5001;
const app = express();

const configuration = new Configuration({
  organization: "org-eyG5tfsktdibhPnjUoitjURd",
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello OPENAI",
  });
});

app.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    // console.log("message", message);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      temperature: 0,
    });
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening`);
});
