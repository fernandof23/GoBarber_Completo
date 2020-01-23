import Notification from '../schemas/notification';
import User from '../models/User';

export default {
  async index(req, res) {
    const existProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!existProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }
    const notifications = await Notification.find({ user: req.userId })
      .sort({ created_at: 'desc' })
      .limit(20);

    return res.json(notifications);
  },
  async update(req, res) {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  },
};
