const passwordStrength = (arg) => {
    const isValidFormat = /^[0-9a-zA-Z-+*_!]+$/.test(arg),
        hasLowerCase = /[a-z]/.test(arg),
        hasUpperCase = /[A-Z]/.test(arg),
        hasDigits = /\d+/.test(arg),
        isLongEnough = arg.length > 7;

    if (
        isValidFormat &&
        hasLowerCase &&
        hasUpperCase &&
        hasDigits &&
        isLongEnough
    ) {
        switch (true) {
            case /[-+*_]/.test(arg) && arg.length > 8: {
                return 4;
            }
            case arg.length > 8: {
                return 3;
            }
            default: {
                return 2;
            }
        }
    }
    return 1;
};

const formatDate = (value) => {
    const onlyDigits = value.replaceAll(/\D/g, "");

    if (onlyDigits.length <= 2) {
        return onlyDigits;
    }

    const day = onlyDigits.slice(0, 2);
    const month = onlyDigits.slice(2, 4);
    const year = onlyDigits.slice(4, 8);

    return `${day}-${month}-${year}`;
};

const isDateValid = (dateArg) => {
    const day = dateArg.slice(0, 2);
    const month = dateArg.slice(3, 5) - 1;
    const year = dateArg.slice(6);
    const minDate = new Date(1900, 0, 0);
    const maxDate = new Date(2020, 0, 0);
    const checkedDate = new Date(year, month, day);

    return (
        checkedDate.getFullYear() == year &&
        checkedDate.getMonth() == month &&
        checkedDate.getDate() == day &&
        checkedDate > minDate &&
        checkedDate < maxDate
    );
};

const translateDateToMs = (dateArg) => {
    const day = dateArg.slice(0, 2);
    const month = dateArg.slice(3, 5) - 1;
    const year = dateArg.slice(6);
    const dateOfBirth = new Date(year, month, day);
    const today = Date.now();
    return Math.trunc(
        (today - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365)
    );
};

export { passwordStrength, formatDate, isDateValid, translateDateToMs };
