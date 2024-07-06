export interface SaveList {
  setItem: (key: string, value: string) => void;
  getItem(key: string): string | null;
}
export class Database implements SaveList {
  private _data: Record<string, string> = {};
  setItem(key: string, value: string): void {
    this._data[key] = value;
  }
  getItem(key: string): string | null {
    return this._data[key] || null;
  }
}
