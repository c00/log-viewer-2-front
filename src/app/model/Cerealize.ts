export namespace cereal {

  export function copyInto<T>(object: T, data: any) {
    for (let key in object) {
      //Make sure both objects have this property
      if (!object.hasOwnProperty(key) || !data.hasOwnProperty(key)) continue;
      object[key] = data[key];
    }
  }

  export function decerealize<T>(type: { new(args?: any): T }, data: any) {
    const result = new type();
    copyInto(result, data);
    return result;
  }

  export function toArrayOf<T>(type: { new(args?: any): T }, data: any) {
    const result = [];
    for (let d of data) {
      result.push(decerealize<T>(type, d));
    }

    return result;
  }

}