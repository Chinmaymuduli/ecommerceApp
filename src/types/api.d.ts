export type APIOptsType = {
  path: string;
  body?: RequestInit['body'];
  method?: RequestInit['method'];
  headers?: {
    [key: string]: string;
  };
  options?: RequestInit;
  token?: string | null;

};

export type APIReturnType = {
  data: any;
  status: number;
  error: any;
  [key: string]: any;
};



export type APIFunction = (APIOpts: APIOptsType) => Promise<APIReturnType>;
