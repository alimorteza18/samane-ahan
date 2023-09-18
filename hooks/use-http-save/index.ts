import { AxiosResponse } from "axios";
import { useState } from "react";
import type { BaseProps } from "@/types/services";
import { RawData } from "@/types";

type UseHttpSaveOptionsType<p> = p & {
  /**
   * @default normal
   */
  formType?: "normal" | "multipart";
  [key: string]: any;
};

export default function useHttpSave<t, p = BaseProps>(
  axiosService: (params?: any) => Promise<AxiosResponse>,
  // @ts-ignore
  options: UseHttpSaveOptionsType<p> = {}
) {
  const { formType = "normal", ...serviceParams } = options;

  const [data, setData] = useState<t>();
  const [rawData, setRawData] = useState<RawData<t>>();
  const [axiosResponse, setAxiosResponse] = useState<AxiosResponse>();
  const [saving, setSaving] = useState<boolean>(false);

  const execute = (
    someOtherParams: any = {}
  ): Promise<AxiosResponse<RawData<t>>> => {
    return new Promise((resolve, reject) => {
      setSaving(true);

      let formData;

      if (formType === "normal")
        formData = { ...checkParams(serviceParams), ...someOtherParams };
      else formData = someOtherParams;

      axiosService(formData)
        .then((res) => {
          setRawData(res.data);
          setAxiosResponse(res);
          setData(res.data.data);
          resolve(res);
        })
        .catch((error) => reject(error))
        .finally(() => setSaving(false));
    });
  };

  return { data, setData, rawData, axiosResponse, saving, setSaving, execute };
}

function checkParams(obj: Record<string, any>): Record<string, any> {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key] === "--") {
      delete newObj[key];
    }
  }
  return newObj;
}
