const dateOfBirth = new Date(1976, 9, 7);

// console.log(dateOfBirth)

const today = Date.now();

// console.log(today);

console.log(typeof dateOfBirth.getTime());

console.log(Math.trunc( (today - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24  * 365) ))

