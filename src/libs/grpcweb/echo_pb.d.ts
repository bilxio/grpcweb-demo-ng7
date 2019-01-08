export class EchoRequest {
  constructor ();
  getMessage(): string;
  setMessage(a: string): void;
  toObject(): EchoRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => EchoRequest;
}

export namespace EchoRequest {
  export type AsObject = {
    Message: string;
  }
}

export class EchoResponse {
  constructor ();
  getMessage(): string;
  setMessage(a: string): void;
  toObject(): EchoResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => EchoResponse;
}

export namespace EchoResponse {
  export type AsObject = {
    Message: string;
  }
}

