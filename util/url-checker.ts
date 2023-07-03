export function isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  export function randomNumber(): number{
    return Math.floor(Math.random() * 3);
  }