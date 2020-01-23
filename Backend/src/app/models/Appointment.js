import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.BOOLEAN,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancellable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(model) {
    this.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(model.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
