import * as Yup from 'yup';
import { isBefore, subHours, format, startOfHour, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/notification';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

export default {
  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    const { date, provider_id } = req.body;

    if (provider_id == req.userId) {
      return res
        .status(400)
        .json({ error: 'You cant make appoitment with yourself' });
    }

    const existProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!existProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Paste date are not permited' });
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not availibly' });
    }

    const user = await User.findByPk(req.userId);

    const formatedData = format(
      hourStart,
      "'dia' dd 'de' MMMM', às ' H:mm'h' ",
      {
        locale: pt,
      }
    );

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formatedData} `,
      user: provider_id,
    });

    return res.json(appointment);
  },

  async index(req, res) {
    const { page = 1 } = req.query;
    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancellable'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(appointments);
  },
  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        { model: User, as: 'provider', attributes: ['name', 'email'] },
        { model: User, as: 'user', attributes: ['name', 'email'] },
      ],
    });

    if (req.userId !== appointment.user_id) {
      return res.status(401).json({
        error: "You don't have permission to delete this appointment",
      });
    }

    const hoursSub = subHours(appointment.date, 2);

    if (isBefore(hoursSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointment two hours in advance ',
      });
    }

    if (appointment.canceled_at) {
      return res.status(401).json({ error: 'Appointment already canceled' });
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    await Queue.add(CancellationMail.key, { appointment });

    return res.json(appointment);
  },
};
