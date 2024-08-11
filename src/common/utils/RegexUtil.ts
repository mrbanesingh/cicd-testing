export class RegexUtil {
  static createCaseInsensitiveRegex(pattern: string): RegExp {
    return new RegExp(`^${pattern}$`, "i");
  }
}
