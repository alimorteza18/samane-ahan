import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import type { BaseProps } from "@/types/services";
import { getItemsForDropdown } from "@/services/util-service";
import { OptionsType, RawData } from "@/types";
import { toast } from "react-toastify";

export default function useHttp<t, p = BaseProps>(
  axiosService: (params?: any) => Promise<AxiosResponse>,
  // @ts-ignore
  options: OptionsType<p> = {},
  onMount = false
) {
  const {
    initialState = null,
    dropdownEmptyItem = false,
    paginate = true,
    page: pageParam = 1,
    per_page: perPageParam = 12,
    formType = "normal",
    mapper = null,
    ...serviceParams
  } = options;

  const didMount = useRef(false);
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState<t>(initialState?.data);
  // @ts-ignore
  const [rawData, setRawData] = useState<RawData<t>>(initialState);
  const [axiosResponse, setAxiosResponse] = useState<AxiosResponse>();
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState(pageParam ?? 1);
  const [per_page, setPerPage] = useState(perPageParam ?? 12);

  const changePage = (newPage: any) => {
    setPage(newPage);
  };

  const changePerPage = (newPerPage: any) => {
    setPerPage(newPerPage);
  };

  const execute = (
    someOtherParams: any = {}
  ): Promise<AxiosResponse<RawData<t>>> => {
    return new Promise((resolve, reject) => {
      setLoading(true);

      let formData;

      if (formType === "normal") {
        formData = {
          ...checkParams(serviceParams),
          ...someOtherParams,
        };

        if (paginate) {
          formData = {
            ...formData,
            page,
            per_page,
          };
        }
      } else {
        formData = someOtherParams;
      }

      axiosService(formData)
        .then((res) => {
          setRawData(res.data);
          setAxiosResponse(res);
          setData(formatData(res.data.data));
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  /**
   * @description if you want to add sth in client side after fetched from server
   * @param data
   * @returns
   */
  const formatData = (data: any) => {
    if (!mapper) return data;

    if (Array.isArray(data)) {
      return data?.map((item: any) => mapper(item));
    } else {
      return mapper(data);
    }
  };

  const updateData = ({
    newDatas,
    id,
    index,
    type = "array",
  }: UpdateDataProps) => {
    let targetIndex: any;
    if (type === "array") {
      if (id) {
        //@ts-ignore
        targetIndex = data?.findIndex((item) => item.id === id);
      } else if (index) {
        targetIndex = index;
      }

      //@ts-ignore
      setData((prev) => {
        // @ts-ignore
        let newDataArray = [...data];

        //@ts-ignore
        newDataArray[targetIndex] = {
          //@ts-ignore
          ...prev[targetIndex], // the old datas
          //@ts-ignore
          ...newDatas, // put new datas
        };

        return newDataArray;
      });
    } else if (type === "object") {
      setData((prev) => {
        return {
          ...prev, // the old datas
          //@ts-ignore
          ...newDatas, // put new datas
        };
      });
    }
  };

  const findSingleField = ({
    want,
    value,
    findBy = "id",
  }: FindSingleFieldProps) => {
    //@ts-ignore
    if (!data?.length) return null;

    //@ts-ignore
    let targetIndex = data?.findIndex((item) => item[findBy] === value);

    //@ts-ignore
    return data[targetIndex][want] ?? null;
  };

  const setSingleFieldValue = ({
    field,
    value,
    id,
    index,
    type = "array",
  }: SetSingleFieldValueProps) => {
    let targetIndex;

    if (type === "array") {
      if (id) {
        //@ts-ignore
        targetIndex = data?.findIndex((item) => item.id === id);
      } else {
        // it was "else if (index)", but because index might be 0 I changed to else (0 is equal to false)
        targetIndex = index;
      }

      //@ts-ignore
      let updatedRow = { ...data[targetIndex] }; // Create a copy of the row to update
      const keys = field.split("."); // Split the key into an array of keys
      keys.reduce((acc, cur, i) => {
        // Iterate through the keys to access the final object
        if (i === keys.length - 1) {
          // If it's the final key, set its value to the new value
          acc[cur] = value;
        } else {
          // Otherwise, access the next nested object
          acc = acc[cur];
        }
        return acc;
      }, updatedRow); // Pass in the copy of the row to update as the initial accumulator value for reduce()
      //@ts-ignore
      const newArray = [...data]; // Create a copy of the original array
      newArray[targetIndex] = updatedRow; // Update the target row in the new array
      //@ts-ignore
      setData(newArray); // Set the new array as the state
    } else if (type === "object") {
      let updatedRow = { ...data }; // Create a copy of the row to update

      const keys = field.split("."); // Split the key into an array of keys
      keys.reduce((acc, cur, i) => {
        // Iterate through the keys to access the final object
        if (i === keys.length - 1) {
          // If it's the final key, set its value to the new value
          //@ts-ignore
          acc[cur] = value;
        } else {
          // Otherwise, access the next nested object
          //@ts-ignore
          acc = acc[cur];
        }
        return acc;
      }, updatedRow); // Pass in the copy of the row to update as the initial accumulator value for reduce()
      setData(updatedRow); // Set the new array as the state
    }
  };

  const dropdown = (value = "id", ...label: string[]) => {
    label = label.length ? label : ["title"];
    let items = getItemsForDropdown(data, value, ...label);

    if (dropdownEmptyItem && items.length) {
      if (typeof dropdownEmptyItem === "boolean") {
        items.unshift({ label: "-", value: "--" });
      } else {
        items.unshift({
          label: dropdownEmptyItem.label ?? dropdownEmptyItem.value,
          value: dropdownEmptyItem.value,
        });
      }
    }

    return items;
  };

  const customDropdown = (data: t, value = "id", ...label: string[]) => {
    label = label.length ? label : ["title"];
    let items = getItemsForDropdown(data, value, ...label);

    if (dropdownEmptyItem && items.length) {
      if (typeof dropdownEmptyItem === "boolean") {
        items.unshift({ label: "-", value: "--" });
      } else {
        items.unshift({
          label: dropdownEmptyItem.label ?? dropdownEmptyItem.value,
          value: dropdownEmptyItem.value,
        });
      }
    }

    return items;
  };

  // for first time
  useEffect(() => {
    if (onMount) execute();
  }, []);

  // only if params changes
  useEffect(() => {
    if (didMount.current) {
      execute();
    } else {
      didMount.current = true;
    }
  }, [JSON.stringify({ page, per_page, ...serviceParams })]);

  return {
    data,
    setData,
    updateData,
    findSingleField,
    setSingleFieldValue,
    dropdown,
    customDropdown,
    rawData,
    axiosResponse,
    loading,
    setLoading,
    execute,
    errors,
    pagination: {
      page,
      perPage: per_page,
      changePage,
      changePerPage,
      lastPage: rawData?.last_page ?? rawData?.meta?.last_page ?? 0,
      total: rawData?.total ?? rawData?.meta?.total ?? 0,
    },
  };
}

interface UpdateDataProps {
  newDatas: any;
  id?: number | string;
  index?: number;
  type?: "array" | "object";
}

export interface SetSingleFieldValueProps {
  field: string;
  value: string | number | boolean | any;
  id?: number | string;
  index?: number;
  type?: "array" | "object";
}

export interface FindSingleFieldProps {
  want: string;
  value: string | number | boolean | any;
  findBy: number | string;
}

export interface UseHttpType {
  data: any;
  rawData: RawData<any>;
  loading: boolean;
  execute: () => void;
  pagination: PaginationType;
}

export interface PaginationType {
  page: string | number;
  perPage: string | number;
  lastPage: string | number;
  changePage: (any: any) => void;
  changePerPage: (any: any) => void;
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
