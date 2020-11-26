export function formatCurrency(number) {
    return (
        new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD'
        }).format(number)
    )
}

export function formatNumberWithTwoDecimals(number) {
    return (
        parseFloat(number).toFixed(2)
    )
}

export function parseToNumber(numberStr) {
    var parsedNumber = parseFloat(numberStr);

    if (isNaN(parsedNumber)) {
        return null;
    }

    return parsedNumber;
}

export function restrictInputToTwoDecimals(numberStr) {
    var decimalIndex = numberStr.indexOf('.');
    var number = decimalIndex >= 0 ? (numberStr.substr(0, decimalIndex) + numberStr.substr(decimalIndex, 3)) : numberStr;
    
    return number;
}

export function formatDate(date) {
    return (
        new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit"
        }).format(date)
    )
}

// Returns time associated to date object formatted to locale time (ie. 9:23 PM)
// Parameters: [date] = Date object
export function formatTime(date) {
    return (
        new Intl.DateTimeFormat("en-US", {
            //timeZone: 'UTC',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        }).format(date)
    )
}

// Returns time associated to date object formatted to military time (ie. 22:42)
// Parameters: [date] = Date object
export function formatMilitaryTime(date) {
    return (
        new Intl.DateTimeFormat("en-US", {
            //timeZone: 'UTC',
            timeStyle: "short",
            hour12: false
        }).format(date)
    )
}

export function getMonthName(date) {
    var options = { month: 'long' };

    return (
        new Intl.DateTimeFormat("en-US", options).format(date)
    )
}

export function getYear(date) {
    var year = date.getFullYear();

    if (year) {
        return year;
    }

    return null;
}

export function sortNumberArrayAsc(array) {
    if (array.some(isNaN)) {
        return null;
    }

    return array.sort((a, b) => {return a - b});
}

export function sortNumberArrayDesc(array) {
    if (array.some(isNaN)) {
        return null;
    }

    return array.sort((a, b) => {return b - a});
}

export const CategoryType = {
    Food: 1,
    Transportation: 2,
    Grocery: 3,
    Health: 4,
    Entertainment: 5,
    Bill: 6,
    Other: 7
}

export const CategoryTypeToIconMap = {
    [CategoryType.Food]: "utensils",
    [CategoryType.Transportation]: "car-side",
    [CategoryType.Grocery]: "shopping-basket",
    [CategoryType.Health]: "first-aid",
    [CategoryType.Entertainment]: "theater-masks",
    [CategoryType.Bill]: "file-invoice-dollar",
    [CategoryType.Other]: "search-dollar"
}

export const CategoryTypeToTitleMap = {
    [CategoryType.Food]: "Food",
    [CategoryType.Transportation]: "Transportation",
    [CategoryType.Grocery]: "Groceries",
    [CategoryType.Health]: "Health",
    [CategoryType.Entertainment]: "Entertainment",
    [CategoryType.Bill]: "Bills",
    [CategoryType.Other]: "Others"
}

export const ToasterType = {
    Success: 1,
    Error: 2,
    Information: 3
}

export const ToasterTypeToClassNameMap = {
    [ToasterType.Success]: "toaster-success",
    [ToasterType.Error]: "toaster-error",
    [ToasterType.Information]: "toaster-info"
}

export const CategoryStatus = {
    Unchanged: 0,
    Added: 1,
    Deleted: 2
}

export const NavigationItems = [
    {
        link: "/authenticated/home",
        text: "Home",
        eventKey: "home",
        icon: "home",
        renderOnHomePage: false
    },
    {
        link: "/authenticated/expenses",
        text: "Expenses",
        eventKey: "expenses",
        icon: "money-bill-wave",
        renderOnHomePage: true,
        homePageText: "Manage Current Expenses"
    },
    {
        link: "/authenticated/expense-history",
        text: "Expense History",
        eventKey: "expense-history",
        icon: "history",
        renderOnHomePage: true,
        homePageText: "View Previous Expenses"
    },
    {
        link: "/authenticated/categories",
        text: "Categories",
        eventKey: "categories",
        icon: "layer-group",
        renderOnHomePage: true,
        homePageText: "Edit Available Categories"
    },
    {
        link: "/authenticated/myProfile",
        text: "My Profile",
        eventKey: "myProfile",
        icon: "user-circle",
        renderOnHomePage: true,
        homePageText: "Visit Your Profile"
    },
    /*
    {
        link: "/authenticated/settings",
        text: "Settings",
        eventKey: "settings",
        icon: "sliders-h"
    }
    */
];