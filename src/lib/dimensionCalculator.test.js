const expect                 = require('chai').expect;
const groupAppointmentByHour = require('../lib/dimensionCalculator').groupAppointmentByHour;

describe('Dimension Calculator', () => {
  let appointments;
  beforeEach(() => {
    appointments = [
      {
        startTime: 585, endTime: 675
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
      const dayObject = groupAppointmentByHour(appointments);
      const hour = '9';
      // There are 3 appointments in 9am to 10am slot
      expect(dayObject[hour]).to.not.equal(undefined)
      expect(dayObject[hour].length).to.equal(2);
    });
  });

  describe('setWidthForEachNode()', () => {

  });

  describe('setHeightForEachNode()', () => {

  })

});
