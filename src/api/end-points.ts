import { Pagination, User } from 'types';

const END_POINTS = {
  // GET
  get: (user?: Partial<User>, pagination?: Pagination) => ({
    user: `user/my-account?page=${pagination?.page}&limit=${pagination?.limit}`,
    address: `address/all/my-addresses?page=${pagination?.page}&limit=${pagination?.limit}`,
    coupons: `coupons?page=${pagination?.page}&limit=${pagination?.limit}`,
    category: `category/all/category?page=${pagination?.page}&limit=${pagination?.limit}`,
    notifications: `notifications?page=${pagination?.page}&limit=${pagination?.limit}`
  }),
  // POST
  post: (user?: Partial<User>) => ({}),
  // PUT
  put: (user?: Partial<User>) => ({}),
  // DELETE
  delete: (user?: Partial<User>) => ({}),
};

export default END_POINTS;
