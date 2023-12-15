import { FailureToastNotification } from "../components/ToastServerError/ToasterMessage";
import request from "./request";

export const exceptionHandler = (errorObj) => {
    const response = {
        message: "Something went to wrong.",
        statusCode: 404,
    };
    if (errorObj?.meta) {
        response.message = errorObj?.meta?.message;
    } else {
        if (errorObj?.response?.data.statusCode !== 404) {
            if (errorObj?.response?.data.statusCode === 400) {
                response.message = errorObj?.response?.data?.message;
                response.status = errorObj?.response?.data?.status;
            } else if (errorObj?.response?.data.statusCode === 500) {
                response.message = errorObj?.response?.data?.message;
                response.status = errorObj?.response?.data?.status;
            } else if (errorObj?.response?.data.statusCode) {
                response.message = errorObj?.response?.data?.message;
                response.status = errorObj?.response?.data?.status;
            } else {
                response.message = "Service Unavailable.";
                response.status = 503;
            }
        }
    }

    return response;
};

export const isUserLoggedIn = () => localStorage.getItem("user");
// export const isUserLoggedIn = () => sessionStorage.getItem("user")


export const getUserData = () => JSON.parse(localStorage.getItem("user"));
// export const getUserData = () => JSON.parse(sessionStorage.getItem("user"))


export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
    if (!value) {
        return "";
    }
    let formatting = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    return new Intl.DateTimeFormat("en-GB", formatting).format(new Date(value));
};


//#region Date Formates
const Currency = [{
        name: 'dollar',
        symbol: '$'
    },
    {
        name: 'eur',
        symbol: '€'
    },
    {
        name: 'dinar',
        symbol: 'د.ك'
    },
    {
        name: 'rupee',
        symbol: '₹'
    },
    {
        name: 'inr',
        symbol: '₹'
    },
    {
        name: 'dirham',
        symbol: 'د.إ'
    }
]

// AMIT UPADHYAY 11/11/2022
export const formatDateToMonthShortwithFormate = (
    value,
    toTimeForCurrentDay = true
) => {
    if (!value) {
        return "";
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

    return day + "-" + month + "-" + year;
};
export const formatDateToMonthShortwithFormate2 = (
    value,
    toTimeForCurrentDay = true
) => {
    if (!value) {
        return "";
    }
    const month = new Intl.DateTimeFormat("en-GB", {
        month: "short",
    }).format(new Date(value));

    const day = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
    }).format(new Date(value));

    return day + "-" + month;
};

export const formatDateToMonthShortwithFormate3 = (
    value,
    toTimeForCurrentDay = true
) => {
    if (!value) {
        return "";
    }
    const month = new Intl.DateTimeFormat("en-GB", {
        month: "long",
    }).format(new Date(value));

    const year = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
    }).format(new Date(value));

    const day = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
    }).format(new Date(value));

    return month + " " + day + "," + year;
};

export function handleCurrency(currency) {
    const MC = Currency ?.find((c) => c.name === currency)
    return MC.symbol
}
//Added By Amit 14-04-2023
export const formatDateToMonthShortwithFormate4 = (
    value,
    toTimeForCurrentDay = true
) => {
    if (!value) {
        return "";
    }

    const month = new Intl.DateTimeFormat("en-GB", {
        month: "2-digit",
    }).format(new Date(value));

    const year = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
    }).format(new Date(value));

    const day = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
    }).format(new Date(value));

    return day + "-" + month + "-" + year;
};
//#endregion



//# Journal Image upload in description

export const uploadToCloudinary = async (file, type,journalId) => {
    const formData = new FormData();
    formData.append('journalImage', file);
    formData.append('journalId', journalId);
    formData.append('imageType', type);
    // formData.append('upload_preset', CLOUDINARY.PRESET);
       const data= await request("POST", "/journal/upload-image", formData, {}, true)
            .then((res) => {

                const media = {
                    secure_url: res.data.data.journalImage,
                };
                return {
                    data: media,
                    url: res.data.data.journalImage,
                };
            })
            .catch((err)=>{
                FailureToastNotification(err?.message)
            })

   return data
};
