import moment from 'moment';

const createdAt = moment('2018-01-07').format();
const updatedAt = createdAt;

export default {
  up: queryInterface => queryInterface.bulkInsert('cities', [
    {
      "id": 1,
      "state_id": 19,
      "city": "Bhubaneswar",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 2,
      "state_id": 19,
      "city": "Cuttack",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 3,
      "state_id": 19,
      "city": "Rourkela",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 4,
      "state_id": 19,
      "city": "Brahmapur",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 5,
      "state_id": 19,
      "city": "Sambalpur",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 6,
      "state_id": 19,
      "city": "Puri",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 7,
      "state_id": 19,
      "city": "Balasore",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 8,
      "state_id": 19,
      "city": "Bhadrak",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 9,
      "state_id": 19,
      "city": "Baripada",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 10,
      "state_id": 19,
      "city": "Balangir",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 11,
      "state_id": 19,
      "city": "Jharsuguda",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 12,
      "state_id": 19,
      "city": "Jeypore",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 13,
      "state_id": 19,
      "city": "Bargarh",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 14,
      "state_id": 19,
      "city": "ayagada",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 15,
      "state_id": 19,
      "city": "Bhawanipatna",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 16,
      "state_id": 19,
      "city": "Paradip",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 17,
      "state_id": 19,
      "city": "Phulbani",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 18,
      "state_id": 19,
      "city": "Jajpur",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 19,
      "state_id": 19,
      "city": "Angul",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    },
    {
      "id": 20,
      "state_id": 19,
      "city": "Dhenkanal",
      "is_active": 1,
      "createdAt": createdAt,
      "updatedAt": updatedAt
    }
  ],
  {}),

  down: queryInterface => queryInterface.bulkDelete('cities', null, {}),
};