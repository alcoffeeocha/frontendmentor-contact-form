import { makeKebabCase, isValidEmail } from '../utils';
describe('all utils func works as intended', () => {
  it('convert string to kebab case', () => {
    expect(makeKebabCase('Hello, World Dude!')).toBe('hello-world-dude');
  });
  it('validate email correctly', () => {
    expect(isValidEmail('alcoffeeocha@yahoo.com')).toBeTruthy();
    expect(isValidEmail('alcoffeeocha')).toBeFalsy();
    expect(isValidEmail('alcoffeeocha@')).toBeFalsy();
  });
});
