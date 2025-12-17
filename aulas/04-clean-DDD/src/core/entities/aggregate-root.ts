import { Entity } from './entity'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  // protected constructor(props: Props, id?: UniqueEntityID) {
  //   super(props, id)
  // }
}
