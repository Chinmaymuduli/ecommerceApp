import { Pagination, User } from 'types';

const END_POINTS = {
  // GET
  get: (user?: Partial<User>, pagination?: Pagination) => ({
    notifications: `db/notifications?id=${user?.uid}&page=${pagination?.page}&limit=${pagination?.limit}`,
    stalls: `stall/all?txt=&page=${pagination?.page}&limit=${pagination?.limit}`,
    networking: `db/users?page=${pagination?.page}&limit=${pagination?.limit}`,
    faqs: `db/faqs?page=${pagination?.page}&limit=${pagination?.limit}`,
  }),
  // POST
  post: (user?: Partial<User>) => ({}),
  // PUT
  put: (user?: Partial<User>) => ({}),
  // DELETE
  delete: (user?: Partial<User>) => ({}),
};

export default END_POINTS;
