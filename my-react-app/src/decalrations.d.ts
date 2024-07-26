declare module 'redux-mock-store' {
  import { Store, AnyAction, Middleware, Dispatch } from 'redux';

  export interface MockStoreEnhanced<S = Record<string, unknown>>
    extends Store<S, AnyAction> {
    getActions(): AnyAction[];
    clearActions(): void;
    dispatch: Dispatch;
  }

  export interface MockStoreCreator<S = Record<string, unknown>> {
    (initialState?: S): MockStoreEnhanced<S>;
  }

  export default function configureStore<S = Record<string, unknown>>(
    middlewares?: Middleware[],
  ): MockStoreCreator<S>;
}
