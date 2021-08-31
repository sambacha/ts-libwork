import { PropertyNamesOnly, TypedProperty } from "./types";

export class ObjectTools {

  static get<T>(obj: object, path: string): T {
    const props = path.split(".");
    if (props.length > 1) {
      let o = (obj as any)[props[0]];
      return (props as any).reduce((p: any, c: any) => {
        if (o === undefined || o[c] === undefined) {
          o = undefined;
          return undefined;
        }
        o = o[c];
        return o;
      });
    } else {
      return (obj as any)[path];
    }
  }

  /**
   * The classes must use the toStringTag symbol.
   */
  static isInstanceOf<T>(value: any, instanceOf: { new(): any }): value is T {
    if (typeof value !== "object") {
      return false;
    } else if ((instanceOf as any).name !== value.constructor.name) {
      return false;
    } else if (new instanceOf()[Symbol.toStringTag] === value[Symbol.toStringTag]) {
      return true;
    }
    return false;
  }

  // Adds the element at a specific position inside the linked list
  static GetMethodNames(obj: any, ...excluded: string[]): string[] {
    const skip: string[] = excluded || [];
    const methods: string[] = [];
    skip.push("constructor");
    let item = obj;

    while (item = Reflect.getPrototypeOf(item)) {

      const keys = Reflect.ownKeys(item);
      if (item instanceof Object) {
        keys.forEach((k) => {
          if (skip.indexOf(k as string) < 0) {
            methods.push(k as string);
          }
        });
      }
    }

    return methods;
  }

  static hasMethod<T>(obj: T, name: string): boolean {
    const desc = Object.getOwnPropertyDescriptor(obj, name);

    return !!desc && typeof desc.value === "function";
  }

  static GetOwnMethodNames<T>(instance: any, ...excluded: string[]): string[] {
    const skip: string[] = excluded || [];
    const methods: string[] = [];
    skip.push("constructor");

    const obj = Reflect.getPrototypeOf(instance);
    const keys = Reflect.ownKeys(obj);
    if (obj instanceof Object) {
      keys.forEach((k) => {
        if (ObjectTools.hasMethod(obj, k.toString()) && skip.indexOf(k as string) < 0) {
          methods.push(k as string);
        }
      });
    }

    return methods;
  }

  static GetValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }


  static CopyNullProps<
    TSource,
    Props extends PropertyNamesOnly<TSource>,
    TTarget extends Pick<TSource, Props>>
    (source: TSource, ...props: Props[]): TTarget {
    const result: any = {};
    for (const prop of props) {
      result[prop] = source[prop];
    }
    return result;
  }

  static CopyProps<
    TSource,
    Props extends PropertyNamesOnly<TSource>,
    TTarget extends Pick<TSource, Props>>
    (source: TSource, ...props: Props[]): TTarget {
    const result: any = {};
    for (const prop of props) {
      if (source[prop]) {
        result[prop] = source[prop];
      }
    }
    return result;
  }

  static OmitProps<
    TSource,
    Props extends PropertyNamesOnly<TSource>,
    TTarget extends Omit<TSource, Props>>
    (source: TSource, ...props: Props[]): TTarget {
    const result: any = {};
    const keys = Object.keys(source).filter(k => props.every(p => p !== k)) as (keyof TSource)[];
    for (const key of keys) {
      if (source[key]) {
        result[key] = source[key];
      }
    }
    return result;
  }

  static CopyEachSource<TSource, TTarget>(source: TSource, target: TTarget): TTarget {
    Object.keys(source)
      .forEach(item => {
        (target as any)[item] = (source as any)[item];
      });

    return target;
  }

  static CopyEachTarget<TSource, TTarget>(source: TSource, target: TTarget): TTarget {
    Object.keys(target)
      .forEach(item => {
        (target as any)[item] = (source as any)[item];
      });

    return target;
  }

  static DeepMerge<T>(source: Partial<T>, target: Partial<T>) {
    const src = source as any;
    const t = target as any;

    const keys = Object.keys(src);
    for (const key of keys) {

      if (src[key] instanceof Array) {

        if (!Array.isArray(t[key])) {
          t[key] = [];
        }
        ObjectTools.DeepMerge(src[key], t[key]);

      } else if (src[key] instanceof Object) {
        if (!t[key]) t[key] = {};
        ObjectTools.DeepMerge(src[key], t[key]);
      } else if (src[key] instanceof Date) {
        t[key] = new Date(src[key].getTime());
      } else {
        t[key] = src[key];
      }

    }

    // return t;
  }

  static DeepEquals<T>(source: T, target: T): boolean {
    // const source = source as any;
    // const target = target as any;
    let result = true;

    const keys = Object.keys(source) as (keyof T)[];
    for (const key of keys) {

      if (source[key] instanceof Array) {
        result = ObjectTools.DeepEquals(source[key], target[key]);
      } else if (source[key] instanceof Object) {
        result = ObjectTools.DeepEquals(source[key], target[key]);
      } else if (source[key] instanceof Date) {
        if (target[key] instanceof Date) {
          return (source[key] as any as Date).getTime() === (target[key] as any as Date).getTime();
        } else {
          result = false;
        }
      } else {
        result = target[key] === source[key];
      }

      if (result !== true) {
        return result;
      }
    }

    return result;
  }

  static DeepMerge2<T>(source: Partial<T>, target: Partial<T>) {
    const t = target as any;

    const keys = Object.keys(source) as any as (keyof T)[];

    for (const key of keys) {
      const srcItem = source[key] as any;

      if (srcItem instanceof Object) {
        ObjectTools.DeepMerge(srcItem, t[key]);
      } else if (srcItem instanceof Date) {
        t[key] = new Date(srcItem.getTime());
      } else if (srcItem instanceof Array) {
        const copy: any[] = [];
        for (let i = 0, len = srcItem.length; i < len; i++) {
          const item = {};
          ObjectTools.DeepMerge(srcItem[i], item);
          copy[i] = item;
        }
        t[key] = copy;
        // ObjectTools.DeepMerge(srcItem, t[key]);
        // if (Array.isArray(t[key])) {
        // } else {
        //   t[key] = [...srcItem];
        // }

      } else {
        t[key] = srcItem;
      }

    }

    return t;
  }

  static DeepCopy<T>(obj: T): T {

    // Null or undefined
    if (obj == null) {
      return obj;
    }

    // Date
    if (obj instanceof Date) {
      return new Date(obj.getTime()) as any;
    }

    // Array
    if (obj instanceof Array) {
      const copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = ObjectTools.DeepCopy(obj[i]);
      }
      return copy as any;
    }

    // Object
    if (obj instanceof Object) {
      const copy: any = {};
      for (const attr in obj) {
        if ((obj as Record<string, any>).hasOwnProperty(attr))
          copy[attr] = ObjectTools.DeepCopy(obj[attr]);
      }
      return copy;
    }

    // Others
    return obj;
  }

  static ObjectFromArray<
    T extends { [Key in K]: string }, // This is required for the reduce to work
    K extends PropertyNamesOnly<T>
  >(array: Array<T>, indexKey: K): TypedProperty<T> {
    return array.reduce((result: TypedProperty<T>, current: T) => {
      result[current[indexKey]] = current;
      return result;
    }, {});
  }
}
