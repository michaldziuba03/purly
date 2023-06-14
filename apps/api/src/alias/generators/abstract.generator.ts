export abstract class AbstractGenerator {
  abstract next(): Promise<string>;
}
