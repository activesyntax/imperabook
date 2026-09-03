// import { Service, signal } from "@angular/core";
// import { Effect, State, Step, UiInput } from "./shell";
// import { browsing } from "./shell-state";
// import { transition } from "./shell-transition";
//
// @Service()
// export class ShellStateMachine {
//
//   public state = signal<State>(browsing());
//
//   public send(input: KeyboardEvent): void {
//
//     // console.log('STATE BEFORE:', this.state(), input);
//     this.apply(transition(this.state(), input, deps));
//     console.log('STATE: ', this.state(), input);
//
//   }
//
//   private apply({ state, effects }: Step): void {
//     this.state.set(state);
//
//     for (const effect of effects) void this.perform(effect);
//   }
//
//   private async perform(effect: Effect): Promise<void> {
//     // if (effect.kind === 'open') {
//     //   try {
//     //     const view = await this.runner.open(effect.cmd);
//     //
//     //     if (view !== null) {
//     //       this.store.setResult(view);
//     //     }
//     //   } catch (error) {
//     //     this.store.setResult(resultOfError(error));
//     //   }
//     //   return;
//     // }
//     //
//     // try {
//     //   this.store.setResult(await this.runner.run(effect.cmd, effect.answers));
//     // } catch (error) {
//     //   this.store.setResult(resultOfError(error));
//     // } finally {
//     //   this.send({ kind: 'completed' });
//     // }
//   }
// }
//
