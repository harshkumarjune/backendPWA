import moment from 'moment';

const createdAt = moment('2018-01-07').format();
const updatedAt = createdAt;

export default {
  up: queryInterface => queryInterface.bulkInsert('products', [
    {
      "id": 1,
      "product": "Griha Seva",
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 2,
      "product": "Home Care",
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 3,
      "product": "Creche",
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 4,
      "product": "Outplacement",
      "createdAt": createdAt,
      "updatedAt": updatedAt
    }
  ],
  {}),

  down: queryInterface => queryInterface.bulkDelete('products', null, {}),
};