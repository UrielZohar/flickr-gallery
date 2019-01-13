let utils = {
    getFormattedDate: (date) => {
        let d = date.split("-");
        let year = d[0];
        let day = d[2].split("T")[0];
        let month = d[1]
        return `${month}/${day}/${year}`;
    },

    extractStringBetweenQuotationMarks: (str) => {
        return str.split('"')[1];
    }
}


export default utils;