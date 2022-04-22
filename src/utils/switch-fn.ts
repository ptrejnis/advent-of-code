type SwitchObjectLiteral<T> = T & { ['default']: unknown };
type SwitchKeys<T> = keyof SwitchObjectLiteral<T>;

export function switchFn<T extends Record<string, unknown>>(expr: SwitchKeys<T>, cases: T): SwitchObjectLiteral<T>[keyof T] {
  const entries = Object.entries(cases);

  for (const [pattern, action] of entries) {
    if (expr === pattern) {
      return isFunc(action) ? action() : action;
    }
  }

  return isFunc(cases.default) ? cases.default() : cases.default;
}

function isFunc(action: unknown): action is Function {
  return typeof action === 'function';
}
