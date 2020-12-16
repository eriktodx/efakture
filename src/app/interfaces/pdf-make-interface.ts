export interface PdfMakeInterface {
  download(defaultFileName?: string, cb?: () => void, options?: any): void
  open(options?: any, window?: Window): void
  print(options?: any, window?: Window): void
  getDataUrl(cb: (dataUrl: string) => void, options?: any): void
  getBase64(cb: (data: string) => void, options?: any): void
  getBuffer(cb: (buffer: any) => void, options?: any): void
  getBlob(cb: (blob: any) => void, options?: any): void
  getStream(): any
}
