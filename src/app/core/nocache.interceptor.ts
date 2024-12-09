import { HttpInterceptorFn, HttpParams } from '@angular/common/http';

export const nocacheInterceptor: HttpInterceptorFn = (req, next) => {
  const timestamp = new Date().getTime();
  const modifiedReq = req.clone({
    url: `${req.url}?timestamp=${timestamp}`,
  });

  return next(modifiedReq);
};
