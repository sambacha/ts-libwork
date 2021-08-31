export interface ITypedProperty<T> {
  [key: string]: T;
}

export interface KeyValuePair<TKey, TValue> {
  key: TKey;
  value: TValue;
}

export interface IDisposable {
  dispose(): void;
}

export interface IUrl {
  href: string;                    // http://user:pass@host.com:81/directory/file.ext?query=1#anchor
  origin: string;                  // http://user:pass@host.com:81
  protocol: string;                // http:
  username: string;                // user
  password: string;                // pass
  host: string;                    // host.com:81
  hostname: string;                // host.com
  port: number;                    // 81
  pathname: string;                // /directory/file.ext
  search: string;                  // ?query=1
  hash: string;                    // #anchor
}