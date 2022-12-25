import { faker } from '@faker-js/faker';
import axios from 'axios';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const getUsersWithPagination = (page, limit) => {
  const users = axios.get(
    `${process.env.REACT_APP_SERVER_URL || 'http://localhost:33714'}/users/pagination/${page}/${limit}`
  );

  return users;
};

export const bannedUserByUserId = (userId, status) => {
  const data = {
    userId,
    status,
  };
  const users = axios.put(`${process.env.REACT_APP_SERVER_URL || 'http://localhost:33714'}/users/banned`, data);
  return users;
};
const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample([true, false]),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
