const dateOfBirth = new Date(1981, 3, 23);

// console.log(dateOfBirth)

const today = Date.now();

// console.log(today);

// console.log(typeof dateOfBirth.getTime());

// console.log(Math.trunc( (today - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24  * 365) ))

// console.log(dateOfBirth.getTime())
// console.log(today)
// console.log(100*365*24*60*60*1000)

// console.log(Date.now() - 100*365*24*60*60*1000)

const preferences = {
    music: ['pop', 'rock', 'electronic', 'classical', 'world music', 'punk', 'metal'],
    films: ['romantic', 'comedy', 'drama', 'horror', 'tv-series', 'sports'],
    art: ['modern', 'abstract', 'realism', 'academicism'],
    activity: ['excursion', 'dance', 'yoga'],
}



// for (let key of Object.keys(preferences)) {
//     console.log(preferences[key])
// }
console.log( Object.values(preferences).flat() )


console.log(Date.now())




