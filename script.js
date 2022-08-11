'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Miss Courtney Brakus',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jeffrey Bayer',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Silvia Boyle',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Jermaine Lehner',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/* ========================================================== */

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements)

  // Display balance
  calcDisplayBalance(acc)

  // Display summary
  calcDisplaySummery(acc)
}

/* Event Handler */
let currentAccount
btnLogin.addEventListener('click', function (e) {

  // prevent form from submitting
  e.preventDefault()

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

  if (currentAccount?.pin === Number(inputLoginPin.value)) {

    // Display UI and message
    labelWelcome.text = `Weşcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()

    updateUI(currentAccount)
  }
})

/* ========================================================== */

const displayMovements = function (movements, sort = false) {

  containerMovements.innerHTML = ''

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row"> 
      <div class="movements__type movements__type--${type}" >${i + 1} ${type}
      </div>
      <div class="movements__value">${mov}€</div>
    </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)
    // afterbegin arrayimizi ters çeviriyor. beforeend ise normal yapıyor.
  })
}

/* ========================================================== */

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
  labelBalance.textContent = `${acc.balance}€`
}

/* ========================================================== */

const calcDisplaySummery = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)

  labelSumIn.textContent = `${incomes}€`

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)

  labelSumOut.textContent = `${Math.abs(out)}€`

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter((int, i, arr) => {
      return int >= 1
    })
    .reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = `${interest}€`
}

/* ========================================================== */

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('')
  })
}
createUsernames(accounts)

/* ========================================================== */

// EventHandler

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault()

  const amount = Number(inputTransferAmount.value)
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

  inputTransferAmount.value = inputTransferTo.value = ''

  if (amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username) {

    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)

    updateUI(currentAccount)
  }
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault()

  const amount = Number(inputLoanAmount.value)

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

    // Add movement
    currentAccount.movements.push(amount)

    // Update UI
    updateUI(currentAccount)
  }
  inputLoanAmount.value = ''
})

btnClose.addEventListener('click', function (e) {
  e.preventDefault()


  if (inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    console.log(index)

    // Delete account
    accounts.splice(index, 1)

    // Hide UI
    containerApp.style.opacity = 0
  }

  inputCloseUsername.value = inputClosePin.value = ''

})

let sorted = false
btnSort.addEventListener('click', function (e) {
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})

/* ========================================================== */

const dogs = [{
    weight: 22,
    curFood: 250,
    owners: ['Alice', 'Bob']
  },
  {
    weight: 8,
    curFood: 200,
    owners: ['Matilda']
  },
  {
    weight: 13,
    curFood: 275,
    owners: ['Sarah', 'John']
  },
  {
    weight: 32,
    curFood: 340,
    owners: ['Michael']
  },
];

// 1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)))
// console.log(dogs)

// 2.
// const account = accounts.find(acc => acc.owner === 'Jessica Davis')
const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'))
console.log(sarahsDog)

console.log(`Sarah's dog is eating ${sarahsDog.curFood < sarahsDog.recFood ? 'not much' : 'too much' }`)

// 3.
const ownersEatTooMuch = dogs
.filter(dog => dog.curFood > dog.recFood)
.flatMap(dog => dog.owners)

console.log(ownersEatTooMuch)

const ownersEatTooLittle = dogs
.filter(dog => dog.curFood < dog.recFood)
.flatMap(dog => dog.owners)

console.log(ownersEatTooLittle)

// 4.
console.log(`${ownersEatTooMuch.join(', ')}'s dog eat too much and ${ownersEatTooLittle.join(', ')}'s dog eat too little`)

// 5.
console.log(dogs.some( dog => dog.curFood === dog.recFood))

// 6.
console.log(dogs.some( dog => dog.curFood > (dog.recFood * 0.90) && dog.curFood < (dog.recFood * 1.1)))

const checkOkay =  dog => dog.curFood > (dog.recFood * 0.90) && dog.curFood < (dog.recFood * 1.1)
console.log(dogs.some(checkOkay))

// 7.
console.log(dogs.filter(checkOkay))

// 8.
const dogsCopy = dogs.slice().sort((a,b) => a.recFood - b.recFood )
console.log(dogsCopy)

const dogsCopy2 = dogs.slice().sort((a,b) => b.recFood - a.recFood )
console.log(dogsCopy2)