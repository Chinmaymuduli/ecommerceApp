import { Pagination, User } from 'types';

const END_POINTS = {
  // GET
  get: (user?: Partial<User>, pagination?: Pagination) => ({
    user: `user/my-account?page=${pagination?.page}&limit=${pagination?.limit}`,
    notifications: `db/notifications?id=${user?._id}&page=${pagination?.page}&limit=${pagination?.limit}`,
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
