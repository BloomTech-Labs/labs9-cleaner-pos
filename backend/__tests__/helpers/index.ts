export interface RequestMock {
  body?: any;
  params?: any;
  query?: any;
  token?: any;
}

export class ResponseMock {
  public jsonValue: any;
  public sendValue: string | undefined;
  public statusValue: number | undefined;
  constructor() {
    this.jsonValue = undefined;
    this.sendValue = undefined;
    this.statusValue = undefined;
  }

  public json(json: any) {
    this.jsonValue = json;
    return json;
  }

  public send(msg: string) {
    this.sendValue = msg;
    return MSGesture;
  }

  public status(status: number) {
    this.statusValue = status;
    return this;
  }
}
