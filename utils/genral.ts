export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  export const ExecuteOne = (function() {
    var executed = false;
    return function(fn: any) {
        if (!executed) {
            executed = true;
            fn();
        }
    };
});