export const STOREBLOGS = 'STOREBLOGS';

export const storeBlogs = (blogs) => ({
  type: STOREBLOGS,
  payload: blogs,
});
