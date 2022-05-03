/**
 * @function mockFetch
 * @param {MockFetch} timeoutLength - The number of ms to delay.
 * @description - Allows the client to simulate an API call delay.
 */
type MockFetch = { timeoutLength?: number };

export const mockFetch = (arg?: MockFetch): Promise<unknown> =>
  new Promise((res: unknown): number =>
    setTimeout(
      <string | Function>res,
      Math.random() * (arg?.timeoutLength || 2000),
    ),
  );
