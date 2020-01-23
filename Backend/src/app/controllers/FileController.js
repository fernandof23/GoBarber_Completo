import File from '../models/File';

export default {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({ name, path });
    return res.json(file);
  },
};
