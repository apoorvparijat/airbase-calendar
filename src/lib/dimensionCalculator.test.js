const forEach             = require('lodash').forEach;
const expect              = require('chai').expect;
const DimensionCalculator = require('../lib/dimensionCalculator');

describe('Dimension Calculator', () => {
  let appointments;
  beforeEach(() => {
    appointments = [
      {
        startTime: 285, endTime: 675
      }, {
        startTime: 590, endTime: 800
      }, {
        startTime: 1080, endTime: 1140
      }
    ];
  });

  describe('getDayObjectToPaint()', () => {

  });

  describe('groupAppointmentByHour()', () => {
    beforeEach(() => {

    });
    it('should return object with events grouped by slots they are occuring in', () => {
      const dayObject = DimensionCalculator.groupAppointmentByHour(appointments);
      const hour      = '9';
      // There are 3 appointments in 9am to 10am slot
      expect(dayObject[hour]).to.not.equal(undefined)
      expect(dayObject[hour].appointments.length).to.equal(2);
    });
  });

  describe('setHeightForEachNode', () => {
    it('should set height of each appointment object', () => {
      DimensionCalculator.setHeightForEachNode(appointments);
      forEach(appointments, (appointment) => {
        expect(typeof(appointment.height)).to.not.equal('undefined');
        expect(appointment.height).to.equal(appointment.endTime - appointment.startTime);
      });
    });
  });

  describe('setWidthForEachNode()', () => {
    it('should set width of each appointment object', () => {
      const dayObject = DimensionCalculator.groupAppointmentByHour(appointments);
      DimensionCalculator.setWidthForEachNode(dayObject);
      expect(dayObject['9'].appointmentWidth).to.be.equal(50);
    });
  });

  describe('setHeightForEachNode()', () => {

  });

});
