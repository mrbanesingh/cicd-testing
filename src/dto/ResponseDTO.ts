// Function to create a generic response object
export function createResponseDto<T>(
  statusCode: number,
  status: string /*success | error */,
  message: string,
  data: T | null
): object {
  return {
    statusCode: statusCode,
    status: status,
    message: message,
    data: data,
  };
}
