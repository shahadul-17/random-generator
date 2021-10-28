export class RandomGenerator {

  private static readonly defaultMinimumRandomStringLength = 1;
  private static readonly defaultMaximumRandomStringLength = 64;
  // we used Record because es5 does not have set...
  private static readonly randomDataDictionary: Record<string, undefined> = {};

  /**
   * Generates random number between 0 and 1.
   * This is just a wrapper around 'Math.random()'.
   * @returns Returns the generated random number.
   */
  static generateNumber(): number {
    return Math.random();
  }

  /**
   * Generates random integer within the specified range.
   * @param maximum Upper bound of range.
   * @param minimum Lower bound of range (optional).
   * @returns Returns the generated random integer.
   */
  static generateIntegerInRange(maximum: number, minimum = 0): number {
    return Math.floor(this.generateNumber() * (maximum - minimum)) + minimum;
  }

  /**
   * Generates fixed length random integer.
   * @param length Number of digits to be contained by the random integer.
   * @returns Returns the generated random integer.
   */
  static generateFixedLengthInteger(length: number): number {
    let minimum = 1;
    let maximum = 9;

    for (let i = 1; i < length; i++) {
      minimum *= 10;
      maximum = (maximum * 10) + 9;
    }

    return this.generateIntegerInRange(maximum, minimum);
  }

  /**
   * Generates a random character.
   * @returns Returns the generated random character.
   */
  static generateCharacter(): string {
    let randomNumber;
    const selection = this.generateIntegerInRange(0, 3);         // generates number between 0, 1 and 2...

    switch (selection) {
      case 0:
        randomNumber = this.generateIntegerInRange(48, 58);      // 48 = '0' and 57 = '9', 58 is out of scope...

        break;
      case 1:
        randomNumber = this.generateIntegerInRange(65, 91);      // 65 = 'A' and 90 = 'Z', 91 is out of scope...

        break;
      case 2:
        randomNumber = this.generateIntegerInRange(97, 123);     // 97 = 'a' and 122 = 'Z', 123 is out of scope...

        break;
      default:
        randomNumber = 104;                                     // assigning an arbitrary number...

        break;
    }

    const randomCharacter = String.fromCharCode(randomNumber);

    // returns random character...
    return randomCharacter;
  }

  /**
   * Generates a random string.
   * @param length Number of characters to be contained by the random string (optional).
   * @returns Returns the generated random string.
   */
  static generateString(length?: number) {
    if (!length) {
      length = this.generateIntegerInRange(
        this.defaultMaximumRandomStringLength,
        this.defaultMinimumRandomStringLength);
    }

    let randomString = "";

    for (let i = 0; i < length; i++) {
      // appends a single character to random string...
      randomString += this.generateCharacter();
    }

    return randomString;
  }

  /**
   * Generates a unique random string.
   * @param length Number of characters to be contained by the unique random string (optional).
   * @returns Returns the generated unique random string.
   */
  static generateUniqueString(length?: number) {
    let randomString;

    do {
      randomString = this.generateString(length);
    } while (randomString in this.randomDataDictionary);

    this.randomDataDictionary[randomString] = undefined;

    return randomString;
  }
}
