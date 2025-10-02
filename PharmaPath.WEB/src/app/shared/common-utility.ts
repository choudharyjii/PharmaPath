export class CommonUtility {
  public static isArray(object: any): boolean {
    return Array.isArray(object);
  }

  public static isBoolean(object: any): boolean {
    return typeof object === "boolean";
  }

  public static isFunction(object: any): boolean {
    return typeof object === "function";
  }

  public static isNull(object: any): boolean {
    return object === null;
  }

  public static isNullOrUndefined(object: any): boolean {
    return object === null || object === undefined;
  }

  public static isUndefined(object: any): boolean {
    return object === undefined;
  }

  public static isLengthy(object: any): boolean {
    return this.isNullOrUndefined(object) ? false  : object.length > 0;
  }

  public static isNullOrUndefinedOrEmpty(object: any): boolean {
    return (
      object === null ||
      object === undefined ||
      (typeof object === "string" && object === "")
    );
  }
}
