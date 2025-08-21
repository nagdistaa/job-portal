import { Webhook } from "svix";
import User from "../models/user.model.js";
export const clerkWebHooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.WEBHOOK_SECRET_KEY);
    await webhook.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = JSON.parse(req.body);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0]?.email_address || "",
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        return res.json({ success: true, message: userData });
      }

      case "user.updated": {
        const userData = {
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0]?.email_address || "",
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        return res.json({ success: true, message: userData });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.json({ success: true, message: "user deleted successfully" });
      }

      default:
        return res.json({ success: false, message: "Unhandled event type" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
