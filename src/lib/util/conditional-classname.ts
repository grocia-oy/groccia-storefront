export function conditionalClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
