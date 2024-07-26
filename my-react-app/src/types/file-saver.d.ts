declare module 'file-saver' {
  export function saveAs(
    data: Blob | string | URL,
    filename?: string,
    options?: { autoBom: boolean },
  ): void;
}
