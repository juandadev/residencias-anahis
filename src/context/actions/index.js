export const sessionStart = (payload) => ({
  type: 'SESSION_START',
  payload,
});

export const sessionEnd = (payload) => ({
  type: 'SESSION_END',
  payload,
});
