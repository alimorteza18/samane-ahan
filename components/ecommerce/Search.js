import React, { useState, useEffect } from "react";
import { PRODUCT_TYPE_DETAILS } from "@/services/product-type-services";
import { PRODUCT_KIND_DETAILS } from "@/services/product-kind-services";
import { useRouter } from "next/router";
import PlaceholderAnimation from "@/components/placeholder";

const Search = () => {
  const router = useRouter();
  const [url, setUrl] = useState({
    type: "",
    kind: "",
    size: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleInput = (e) => {
    if (e.key === "Enter") {
      setUrl({
        type: "",
        kind: "",
        size: "",
      });
      e.preventDefault();
      const str = e.target.value;
      let types = Object.values(PRODUCT_TYPE_DETAILS)
        .map((type) => type.label)
        .join("|");

      let kinds = Object.values(PRODUCT_KIND_DETAILS)
        .map((kind) => kind.label)
        .join("|");

      const numbers = "[0-9]";
      const all_numbers = `${numbers}+[/.]?${numbers}*`; // including decimal numbers

      const typeRegex = `(?<type>${types})`;
      const kindRegex = `(?<kind>${kinds})`;
      const sizeRegex = `(?<size>${all_numbers})(?!\\*)`;
      const dimensionRegex = `(?<x>${all_numbers})\\*(?<y>${all_numbers})`;

      let typeString = "";
      let kindString = "";
      let numberString = "";

      const reg = new RegExp(typeRegex, "g");
      const regKind = new RegExp(kindRegex, "g");
      const regSize = new RegExp(sizeRegex, "g");

      if (reg.test(str)) {
        typeString = str.match(reg)[0];
      }

      if (regKind.test(str)) {
        kindString = str.match(regKind)[7];
      }

      if (regSize.test(str)) {
        numberString = str.match(regSize)[0];
      }
      if (typeString) {
        Object.values(PRODUCT_TYPE_DETAILS).map((types) => {
          Object.values(types).map((type) => {
            if (type == typeString) {
              setUrl((prevState) => {
                return { ...prevState, type: types.enLabel };
              });
            }
          });
        });
      }
      if (typeString && kindString) {
        Object.values(PRODUCT_KIND_DETAILS).map((kinds) => {
          Object.values(kinds).map((kind) => {
            if (kind == kindString) {
              setUrl((prevState) => {
                return { ...prevState, kind: kinds.enLabel };
              });
            }
          });
        });
      }
      if (typeString && kindString && numberString) {
        setUrl((prevState) => {
          return { ...prevState, size: numberString };
        });
      }
      if (!hasSubmitted) {
        setHasSubmitted(true);
      }
    }
  };

  useEffect(() => {
    if (hasSubmitted) {
      console.log("uuuuu", url);
      if (url.type && url.kind && url.size) {
        console.log("dlkdlkdlkdlkl");
        router.push(`/price/${url.type}-${url.kind}-${url.size}`);
      } else if (url.type && url.kind) {
        router.push(`/price/${url.type}-${url.kind}`);
      } else if (url.type && !url.kind) {
        router.push(`/price/${url.type}`);
        setUrl({ type: "", kind: "", size: "" });
      }
    }
  }, [url, hasSubmitted]);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <div className="input-container" style={{ overflowAnchor: "none" }}>
        <div className="category" style={{}}>
          دسته بندی ها
        </div>
        <input
          type="text"
          onChange={(e)=>setInputValue(e.target.value)}
          onKeyDown={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {inputValue ? (
          <label
            className={isFocused ? "active" : ""}
            htmlFor="input-field"
          ></label>
        ) : (
          <label className={isFocused ? "active" : ""} htmlFor="input-field">
            <PlaceholderAnimation
              title={["تیرآهن معمولی ۱۴", "میلگرد آجدار ۸", "ورق آلیاژی ۲.۵"]}
            />
          </label>
        )}

        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5342 0C17.894 0 23.0672 5.17315 23.0672 11.533C23.0672 14.5335 21.9157 17.2702 20.0313 19.3241L23.7392 23.0242C24.0862 23.3712 24.0873 23.9326 23.7403 24.2796C23.5674 24.4548 23.3388 24.5413 23.1115 24.5413C22.8853 24.5413 22.6579 24.4548 22.4838 24.2819L18.7312 20.5398C16.7571 22.1207 14.2542 23.0672 11.5342 23.0672C5.17433 23.0672 0 17.8928 0 11.533C0 5.17315 5.17433 0 11.5342 0ZM11.5342 1.77649C6.15377 1.77649 1.77649 6.15259 1.77649 11.533C1.77649 16.9134 6.15377 21.2907 11.5342 21.2907C16.9134 21.2907 21.2907 16.9134 21.2907 11.533C21.2907 6.15259 16.9134 1.77649 11.5342 1.77649Z"
            fill="#848484"
          />
        </svg>
      </div>
    </>
  );
};

export default Search;
