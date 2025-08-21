export interface IError {
  status: number;
  data: {
    message?: string;
    error?: {
      statusCode?: number;
    };
    success?: boolean;
    stack?: string;
  };
}
