export function dataArrayToDataURL(
  data: Uint8Array | Uint16Array | Float32Array | Float64Array,
  width: number,
  height: number,
): string {
  // Canvas を作成
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return "";
  }

  // ImageData用の8ビット配列を作成
  const imageData = ctx?.createImageData(width, height);

  const imageDataArray = imageData.data;

  // 最大値を取得（正規化用）
  let maxValue: number;

  if (data instanceof Uint8Array) {
    maxValue = 255;
  } else if (data instanceof Uint16Array) {
    maxValue = 65535;
  } else {
    // Float32Array または Float64Array の場合、実際の最大値を探す
    maxValue = Math.max(...Array.from(data));
  }

  // 各データ型から8ビットに変換（正規化）
  for (let i = 0; i < data.length; i++) {
    // データ値を8ビットにスケール
    const value = Math.floor((data[i] * 255) / maxValue);

    // グレースケールの場合
    const pixelIndex = i * 4;
    imageDataArray[pixelIndex] = value; // R
    imageDataArray[pixelIndex + 1] = value; // G
    imageDataArray[pixelIndex + 2] = value; // B
    imageDataArray[pixelIndex + 3] = 255; // A
  }

  // Canvas に描画
  ctx.putImageData(imageData, 0, 0);

  // Data URL として取得
  return canvas.toDataURL("image/png");
}
