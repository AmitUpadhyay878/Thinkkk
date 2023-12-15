export const exceptionHandler = (errorObj) => {
  const response = {
    message: "Something went to wrong.",
    statusCode: 404,
  };
  if (errorObj?.meta) {
    response.message = errorObj?.meta?.message;
  } 
  else {
    if (errorObj?.response?.data.statusCode !== 404) {
      
      if (errorObj?.response?.data.statusCode ===400) {
        response.message = errorObj?.response?.data?.message;
        response.status = errorObj?.response?.data?.status;
      }
     else if (errorObj?.response?.data.statusCode ===500) {
        response.message = errorObj?.response?.data?.message;
        response.status = errorObj?.response?.data?.status;
      }
      else if(errorObj?.response?.data.statusCode) {
        response.message = errorObj?.response?.data?.message;
        response.status = errorObj?.response?.data?.status;
      }
      else {
        response.message = "Service Unavailable.";
        response.status = 503;
      }
    }
  }
  
  return response;
};

export const isUserLoggedIn = () => localStorage.getItem("user");

export const getUserData = () => JSON.parse(localStorage.getItem("user"));

export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  let formatting = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    // hour12: true
  };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }
  return new Intl.DateTimeFormat("en-GB", formatting).format(new Date(value));
};


// AMIT UPADHYAY 11/11/2022
export const formatDateToMonthShortwithFormate = (value, toTimeForCurrentDay = true) => {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    let formatting = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      // hour12: true
    };
  
    if (toTimeForCurrentDay && isToday(date)) {
      formatting = { hour: "numeric", minute: "numeric" };
    }
  
    const month = new Intl.DateTimeFormat("en-GB", {
      month: "short",
    }).format(new Date(value));
  
    const year = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
    }).format(new Date(value));
  
    const day = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
    }).format(new Date(value));

    return  day + "-" + month + "-" + year
  };
  export const formatDateToMonthShortwithFormate2 = (value, toTimeForCurrentDay = true) => {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    let formatting = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      // hour12: true
    };
  
    if (toTimeForCurrentDay && isToday(date)) {
      formatting = { hour: "numeric", minute: "numeric" };
    }
  
    const month = new Intl.DateTimeFormat("en-GB", {
      month: "short",
    }).format(new Date(value));
  
    const year = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
    }).format(new Date(value));
  
    const day = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
    }).format(new Date(value));

    return  day + "-" + month 
  };


export function generateUuid() {
  return Math.floor((1 + Math.random()) * 0x10000000000000)
    .toString(16)
    .substring(1);
}

export const timeDifference = (timestamp, locale = "en") => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  //const msPerMonth = msPerDay * 30
  //const msPerYear = msPerDay * 365

  const current = Date.now();
  const elapsed = current - timestamp;

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (elapsed < msPerMinute) {
    return rtf.format(-Math.floor(elapsed / 1000), "seconds");
  } else if (elapsed < msPerHour) {
    return rtf.format(-Math.floor(elapsed / msPerMinute), "minutes");
  } else if (elapsed < msPerDay) {
    return rtf.format(-Math.floor(elapsed / msPerHour), "hours");
    // } else if (elapsed < msPerMonth) {
    //     return rtf.format(-Math.floor(elapsed / msPerMonth), "months")
    // } else if (elapsed < msPerYear) {
    //     return rtf.format(-Math.floor(elapsed / msPerYear), "years")
  } else {
    // return new Date(timestamp).toLocaleDateString(locale)
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      // hour12: true
    }).format(timestamp);
  }
};

export const chatTimeDifference = (timestamp, locale = "en") => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msSixDay = msPerHour * 24 * 7;
  const current = Date.now();
  const elapsed = current - timestamp;

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });

  if (elapsed < msPerMinute) {
    if (Math.floor(elapsed / 1000) === 0) {
      return "just now";
    } else {
      return rtf.format(-Math.floor(elapsed / 1000), "seconds");
    }
  } else if (elapsed < msPerHour) {
    return rtf.format(-Math.floor(elapsed / msPerMinute), "minutes");
  } else if (elapsed < msPerDay) {
    return rtf.format(-Math.floor(elapsed / msPerHour), "hours");
  } else if (elapsed < msSixDay) {
    return rtf.format(-Math.floor(elapsed / msPerDay), "days");
  } else {
    // return new Date(timestamp).toLocaleDateString(locale)
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      // hour12: true
    }).format(timestamp);
  }
};
