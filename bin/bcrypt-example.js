const bcrypt = require('bcrypt');


// encryption process

// Step #1: Generate and encryption "salt"
// (randomness to the encryption)
const salt1 = bcrypt.genSaltSync(10);

// Step #2: Encrypting the password using the salt
const scrambled1 = bcrypt.hashSync('swordfish', salt1);

console.log('Encrypting "swordfish"........');
console.log('salt1      ---> ' + salt1);
console.log('encrypted1 ---> ' + scrambled1);


const salt2 = bcrypt.genSaltSync(10);
const scrambled2 = bcrypt.hashSync('swordfish', salt2);

console.log('Encrypting "swordfish" again........');
console.log('salt2      ---> ' + salt2);
console.log('encrypted2 ---> ' + scrambled2);


console.log(bcrypt.compareSync('swordfish', scrambled2));

console.log(bcrypt.compareSync('Swordfish', scrambled2));
