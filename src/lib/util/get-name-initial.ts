export function getNameInitial(name: string): string {
  if (name.length === 0) {
    return '';
  }

  return name.charAt(0).toUpperCase();
}
