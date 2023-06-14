export abstract class Usecase<TCommand> {
  abstract execute(command: TCommand): any;
}
