import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { decode } from "tiff";
import { dataArrayToDataURL } from "./dataArrayToDataUrl";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
} as const;

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
} as const;

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
} as const;

const img = {
  display: "block",
  width: "auto",
  height: "100%",
} as const;

export function Previews() {
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/tiff": [],
    },
    onDrop: async (acceptedFiles) => {
      setFiles(
        await Promise.all(
          acceptedFiles.map(async (file) => {
            const [result] = decode(await file.arrayBuffer());

            console.log(result);

            return {
              file,
              preview: dataArrayToDataURL(
                result.data,
                result.width,
                result.height,
              ),
            };
          }),
        ),
      );
    },
  });

  const thumbs = files.map(({ file, preview }) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt="thumbnail"
          src={preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach(({ preview }) => {
        if (preview) {
          URL.revokeObjectURL(preview);
        }
      });
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
