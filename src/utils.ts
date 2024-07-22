export function makeKebabCase(str: string): string {
  const lowerCased = str.toLowerCase();
  const cleaned = lowerCased.replace(/[\W]+/g, ' ');
  const trimmed = cleaned.trim();
  const addedDash = trimmed.replace(/\s+/g, '-');
  return addedDash;
}

export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
