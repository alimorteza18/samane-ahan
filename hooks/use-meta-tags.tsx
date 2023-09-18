import { getMetaTags, GetMetaTags } from "@/services/meta-tags-services";
import { useEffect, useState } from "react";

const useMetaTags = (props?: UseMetaTags) => {
  const defaultTags = getMetaTags(props);

  const [meta, setMeta] = useState(props?.initialValues ?? defaultTags);

  useEffect(() => {
    setMeta(getMetaTags(props));
  }, [JSON.stringify(props)]);

  return {
    ...meta,
  };
};

export default useMetaTags;

interface UseMetaTags extends GetMetaTags {
  initialValues?: { title: string; description: string };
}
