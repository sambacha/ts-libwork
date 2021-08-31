import { IUrl } from "./Interfaces";
import { ObjectTools } from "./ObjectTools";

export function parseUrl(url: string): IUrl {
  const parts = /(?:(?:(([^:\/#\?]+:)?(?:(?:\/\/)(?:(?:(?:([^:@\/#\?]+)(?:\:([^:@\/#\?]*))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((?:\/?(?:[^\/\?#]+\/+)*)(?:[^\?#]*)))?(\?[^#]+)?)(#.*)?/.exec(url);

  if (!parts) {
    return {} as IUrl;
  }

  return {
    href: parts[0],
    origin: parts[1],
    protocol: parts[2],
    username: parts[3],
    password: parts[4],
    host: parts[5],
    hostname: parts[6],
    port: Number(parts[7]),
    pathname: parts[8],
    search: parts[9],
    hash: parts[10]
  };
}

/**
 * Replace placeholder in text with args
 *
 * Indexed:
 * const str = RegexTools.replace('{1} {0}', 'tool', 'Nice'};
 *
 * With Object:
 * const str = RegexTools.replace('{a} {b}', {b: 'tool', a: 'Nice'}};
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function replace(text: string, ...args: any[]): string {
  let result = text;

  if (args.length) {
    const t = typeof args[0];
    let key;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any = (t === "string" || t === "number") ?
      Array.prototype.slice.call(args) :
      args[0];

    for (key in values) {
      result = result.replace(new RegExp("\\{" + key + "\\}", "gi"), values[key]);
    }
  }

  return result;
};

/**
 * Replace placeholder in text with args
 *
 * With Object:
 * const str = RegexTools.replacePath('{a} {b.1}', {b: {1:'tool'}, a: 'Nice'}};
 *
 */
export function replacePath(text: string, values: object): string {

  if (text === undefined || values === undefined) {
    return text;
  }

  const regex = /\{(?:[^{}]+)\}/g;
  let result = text;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    m.forEach(match => {
      result = result.replace(match, ObjectTools.get(values, match.substring(1, match.length - 1)));
    });
  }

  return result;
};
