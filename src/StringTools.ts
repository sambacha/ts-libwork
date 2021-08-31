/* eslint-disable @typescript-eslint/no-namespace */
export namespace StringTools {

  export function format(text: string, ...args: unknown[]): string {
    let result = text;

    if (args.length) {
      const t = typeof args[0];
      let key;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const values: any = ("string" === t || "number" === t) ?
        Array.prototype.slice.call(args)
        : args[0];

      for (key in values) {
        result = result.replace(new RegExp("\\{" + key + "\\}", "gi"), values[key]);
      }
    }

    return result;
  };

  // interface String {
  //   format(...args: any[]): string;
  // }

  // (<any>String.prototype).format =
  //   function (...args: any) {
  //     let str = this.toString();
  //     if (args.length) {
  //       var t = typeof args[0];
  //       var key;
  //       var args = ("string" === t || "number" === t) ?
  //         Array.prototype.slice.call(args)
  //         : args[0];

  //       for (key in args) {
  //         str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
  //       }
  //     }

  //     return str;
  //   };

}
