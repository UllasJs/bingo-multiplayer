import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { StreamChat } from "stream-chat";
import bcrypt from "bcrypt";

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());

const api_key = "882nhfx46cuu";
const api_secret =
  "gn7g9xgyv5tdx9ksrw3qcufkbu4yhjxs4xemy28gmvk9t6ywurufns29pmgdeyzs";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    // console.log(token, userId, username, hashedPassword);
    res.json({ token, userId, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // console.log("data in index", username, password);

    const { users } = await serverClient.queryUsers({ name: username });

    // console.log(users[0]);

    if (users.length === 0) return res.json({ message: "user not found" });

    const passmatch = await bcrypt.compare(password, users[0].hashedPassword);

    if (!passmatch) {
      return res.json({ message: "incorrect password" });
    }

    const token = serverClient.createToken(users[0].id);

    res.json({
      token,
      userId: users[0].id,
      username: users[0].name,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
