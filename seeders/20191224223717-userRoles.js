import moment from 'moment';

const createdAt = moment('2018-01-07').format();
const updatedAt = createdAt;

export default {
  up: queryInterface => queryInterface.bulkInsert('userRoles', [
    {
      "id": 1,
      "type": "Super Admin",
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 2,
      "type": "Admin",
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 3,
      "type": "Nurse",
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 4,
      "type": "Doctor",
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 5,
      "type": "Vendor",
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 6,
      "type": "Customer",
      "createdAt": createdAt,
      "updatedAt": updatedAt
    }
  ],
  {}),

  down: queryInterface => queryInterface.bulkDelete('userRoles', null, {}),
};