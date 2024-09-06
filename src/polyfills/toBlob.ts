if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value(callback: any, type: string, quality: any): void {
      const dataURL = this.toDataURL(type, quality).split(',')[1];
      setTimeout(() => {
        const binStr = atob(dataURL);
        const len = binStr.length;
        const arr = new Uint8Array(len);

        // tslint:disable-next-line:no-increment-decrement
        for (let i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], { type: type || 'image/png' }));

      });
    }
  });
}
