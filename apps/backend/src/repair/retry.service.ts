export async function retry<T>(
  operation: () => Promise<T>,
  maxRetries = 2
): Promise<T> {

  let lastError: unknown;

  for (let i = 0; i <= maxRetries; i++) {

    try {

      return await operation();

    } catch (err) {

      lastError = err;

      console.log(
        `Retry ${i + 1}/${maxRetries + 1}`
      );

    }

  }

  throw lastError;

}