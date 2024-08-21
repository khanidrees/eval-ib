

// Polyfill for environments where window is not available (e.g., server-side rendering)
export function polyfillPromiseWithResolvers() {
  if (!Promise.withResolvers) {
    Promise.withResolvers = function () {
      let resolve;
      let reject;

      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });

      return { promise, resolve, reject };
    };
  }
}