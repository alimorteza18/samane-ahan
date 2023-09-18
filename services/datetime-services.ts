export const checkProductsTableHeaderDate = (date: string, dataFa: string) => {
  let today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  let todayDate = today.split("/");
  let todayyear = todayDate[2];
  let todaymonth = todayDate[0];
  let todayday = todayDate[1];

  let groupData = date.split("-");
  let year = groupData[0];
  let month = groupData[1];
  let day = groupData[2];

  let groupDataFa = dataFa.split("-");
  let yearFa = groupDataFa[0];
  let monthFa = groupDataFa[1];
  let dayFa = groupDataFa[2];

  if (`${year}/${month}/${day}` == `${todayyear}/${todaymonth}/${todayday}`) {
    return "امروز";
  } else if (
    `${year}/${month}` == `${todayyear}/${todaymonth}` &&
    // @ts-ignore
    todayday - day == 1
  ) {
    return "دیروز";
    // return ` ${yearFa}/${monthFa}/${dayFa}`;
  } else {
    // return 'روزهای پیشین'
    return ` ${yearFa}/${monthFa}/${dayFa}`;
  }
};

export const dateToPersian = (targetData: string | null = null) => {
  if (targetData) return new Date(targetData).toLocaleDateString("fa-IR");
  else return new Date().toLocaleDateString("fa-IR");
};

/**
 *
 * @param {String} date - ex: 2022-01-04 15:32:10
 * @param {*} [locale] - ex: fa-IR (which is default locale)
 * @returns {String} - ex: 1401/01/01
 */
export const dateToPersianTimeString = (date: string) => {
  const currentDate = new Date(date);
  const convertedDate = currentDate?.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return convertedDate;
};

export const dateToPersianDateTimeString = (date: string) => {
  return dateToPersianTimeString(date) + " - " + dateToPersian(date);
};
