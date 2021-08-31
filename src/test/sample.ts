/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Properties } from '../src/Properties';
import { StringTools } from "../StringTools";
import { WithStringTag } from "./StringTagClass";
import { ObjectTools } from "../ObjectTools";

export class Sample {

  run(): void {

    const x = StringTools.format("spieler {0} heißt {1}", 1, "peter");

    const sourceObject = {
      str: "src",
      num: 1,
      arr: [
        {
          str: "arr",
          num: 2,
          arr2: [
            {
              str: "arr2-1",
              num: 5
            }
          ]
        }
      ]
    };

    const targetObject = {
      str: "s323532rc",
      num: 15533,
      arr: [
        {
          str: "targetarr33",
          num: 2433332,
          onylInTarget: true,
          arr2: [
            {
              str: "arsdfgsdgr2-1",
              num: 24354325
            }
          ]
        }
      ]
    };

    // const result = obj.DeepMerge(sourceObject, targetObject);

    // console.log(result);

  }

  runStringTag() {
    const a = new WithStringTag();
    const b = new WithStringTag();

    const result = ObjectTools.isInstanceOf(a, WithStringTag);

  }
}

const sample = new Sample();
sample.runStringTag();
