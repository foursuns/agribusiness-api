import { ResponseDto } from 'src/api/interfaces/response';

export function customMessage(statusCode: number, message: string, data = {}): ResponseDto {
  return {
    statusCode: statusCode,
    message: message,
    data: data,
  };
}
