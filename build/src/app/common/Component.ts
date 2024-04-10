import { Component as ReactComponent} from 'react';

interface ParamsClasses {
    [param:string]: ParamsClasses | number | string,
}

export abstract class Component<
    Props extends {},
    State extends {}
  > extends ReactComponent<
    Props & Partial<{classes: ParamsClasses}>,
    State
  > {

}
