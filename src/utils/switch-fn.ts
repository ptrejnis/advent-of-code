type SwitchObjectLiteral<T> = T & { ['default']: unknown };
type SwitchKeys<T> = keyof SwitchObjectLiteral<T>;

export function switchFn<T extends Record<string, unknown>>(expr: SwitchKeys<T>, cases: T): SwitchObjectLiteral<T>[keyof T] {
  const entries = Object.entries(cases);

  for (const [pattern, action] of entries) {
    if (expr === pattern) {
      return caseIsArrowFunc(action) ? action() : action;
    }
  }

  const handler = cases.default;
  return caseIsArrowFunc(handler) ? handler() : handler;
}

function caseIsArrowFunc(action: unknown): action is Function {
  return typeof action === 'function' && action.prototype === undefined;
}
