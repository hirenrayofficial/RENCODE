import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast } from "sonner"; // Optional: for upload feedback

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const isInitializedRef = useRef(false);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    // --- CLOUDINARY UPLOAD LOGIC ---
    const selectLocalImage = (quill) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/jpeg,image/png,image/webp"); // Specific types
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;

        // --- 1. Client-Side Validation ---
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB limit
        if (file.size > MAX_SIZE) {
          toast.error("File is too large. Max limit is 5MB.");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "blogren");

        // Store toast ID to dismiss/update it later
        const toastId = toast.loading("Uploading image...");

        try {
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/dihfmeuqt/image/upload`,
            { method: "POST", body: formData },
          );

          // --- 2. Check HTTP Errors ---
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error?.message || "Upload failed");
          }

          const data = await res.json();
          const url = data.secure_url;

          // --- 3. Secure & Optimize URL ---
          // Use https and apply Cloudinary transformations
          const optimizedUrl = url.replace(
            "/upload/",
            "/upload/f_auto,q_auto,w_1000/",
          );

          const range = quill.getSelection();
          const index = range ? range.index : quill.getLength(); // Fallback if no selection

          quill.insertEmbed(index, "image", optimizedUrl);
          quill.setSelection(index + 1); // Move cursor past the image

          toast.success("Image uploaded!", { id: toastId });
        } catch (err) {
          console.error("Cloudinary Error:", err);
          toast.error(err.message || "Upload failed", { id: toastId });
        } finally {
          // Cleanup the hidden input
          input.remove();
        }
      };
    };
    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div"),
      );

      const quill = new Quill(editorContainer, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "blockquote", "code-block"],
              ["clean"],
            ],
            handlers: {
              // Override the image button
              image: function () {
                selectLocalImage(this.quill);
              },
            },
          },
        },
      });

      ref.current = quill;

      if (defaultValue && !isInitializedRef.current) {
        quill.setContents(defaultValue);
        isInitializedRef.current = true;
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref, defaultValue]); // Only run once on mount

    return <div className="modern-editor-container" ref={containerRef}></div>;
  },
);

Editor.displayName = "Editor";
export default Editor;
