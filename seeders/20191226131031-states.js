import moment from 'moment';

const createdAt = moment('2018-01-07').format();
const updatedAt = createdAt;

export default {
  up: queryInterface => queryInterface.bulkInsert('states', [
    {
      "id": 1,
      "state": "Andhra Pradesh",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 2,
      "state": "Arunachal Pradesh",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 3,
      "state": "Assam",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 4,
      "state": "Bihar",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 5,
      "state": "Chhattisgarh",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 6,
      "state": "Goa",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 7,
      "state": "Gujarat",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 8,
      "state": "Haryana",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 9,
      "state": "Himachal Pradesh",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 10,
      "state": "Jharkhand",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 11,
      "state": "Karnataka",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 12,
      "state": "Kerala",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 13,
      "state": "Madhya Pradesh",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 14,
      "state": "Maharashtra",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 15,
      "state": "Manipur",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 16,
      "state": "Meghalaya",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 17,
      "state": "Mizoram",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 18,
      "state": "Nagaland",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 19,
      "state": "Odisha",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 20,
      "state": "Punjab",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 21,
      "state": "Rajasthan",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 22,
      "state": "Sikkim",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 23,
      "state": "Tamil Nadu",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 24,
      "state": "Telangana",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 25,
      "state": "Tripura",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 26,
      "state": "Uttar Pradesh",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 27,
      "state": "Uttarakhand",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 28,
      "state": "West Bengal",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    }
  ],
  {}),

  down: queryInterface => queryInterface.bulkDelete('states', null, {}),
};