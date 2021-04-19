const proxyHandler: ProxyHandler<any> = {
  get(target, key, receiver) {
    if(key === 'constructor') {
      return target[key];
    } else if(typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], proxyHandler)
    } else {
      target[key] = {};
      return new Proxy(target[key], proxyHandler)
    }
  },
  set (target, key, value) {
    target[key] = value;
    return true
  }
}

export type Proto<T extends object> = T & {constructor: new () => T};

export class MockHelper<T extends object> {
  private _prototype: Proto<T>;
  private _originalPrototype: Proto<T>;

  constructor(proto: T) {
    this._prototype = proto as Proto<T>;
    this._originalPrototype = Object.assign({}, this._prototype);
  }

  
  public setup(fn: (proto: Proto<T>) => void) {
    fn(new Proxy<Proto<T>>(this._prototype, proxyHandler));
  }

  public get(): Proto<T> {
    return this._prototype;
  }

  public reset() {
    const oKeys = Object.keys(this._originalPrototype);
    Object.keys(this._prototype).forEach(key => {
      if(!oKeys.includes(key)) {
        delete this._prototype[key as keyof Proto<T>]
      }
    })
  
    Object.assign(this._prototype, this._originalPrototype);
    jest.resetAllMocks();
  }
}
