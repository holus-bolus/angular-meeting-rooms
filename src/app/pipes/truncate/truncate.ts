export function truncate(value: string, limit: number = 25, completeWords: boolean = false, ellipsis: string = '...'): string {
  if (!value) {
    return;
  }
  if (completeWords) {
    // tslint:disable-next-line:no-parameter-reassignment
    limit = value.substr(0, limit).lastIndexOf(' ');
  }
  if (value && value.length <= limit) {
    return value;
  }

  return `${value.substr(0, limit)}${ellipsis}`;
}
