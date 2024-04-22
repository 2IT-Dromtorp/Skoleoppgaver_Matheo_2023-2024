# Borrow from Drømtorp

## Database model

### Fields in database

```
Dromtorp - database
 ┣ Users - collection
 ┃ ┣ email - The users school email address - Unique index - Required for all users
 ┃ ┣ givenName - The users given name/firstname - Required for all users
 ┃ ┣ surname - The users surname - Required for all users
 ┃ ┣ password - The users password - Required for all users
 ┃ ┣ phone - The users phone number - Required for students
 ┃ ┣ address - The users address - Required for students
 ┃ ┣ borrowed - Array of json objects - Required for all users
 ┃ ┃ ┣ serialNumber - The items serial number - Referencing Items.serialNumber
 ┃ ┃ ┗ tool - The items name
 ┃ ┣ kin - Array of json objects - Required for students
 ┃ ┃ ┣ name - The relatives full name
 ┃ ┃ ┣ email - The relatives email
 ┃ ┃ ┣ phone - The relatives phone number
 ┃ ┃ ┗ address - The relatives address
 ┃ ┣ class - The users class/role - Required for all users
 ┃ ┗ _id - The standard MongoDb id
 ┃
 ┣ Items - collection
 ┃ ┣ serialNumber - Serial number of item - Unique Index - Can't be null
 ┃ ┣ tool - The name of the item - Can't be null
 ┃ ┣ extraInfo - Extra info of the item
 ┃ ┣ borrowedBy - Email of the user currenly loaning it - Referencing Users.email
 ┃ ┗ _id - The standard MongoDb id
 ┃
 ┣ Requests - collection
 ┃ ┣ ranId - Random string to identify document - Unique Index
 ┃ ┣ item - Array of json objects
 ┃ ┃ ┣ serialNumberOfItem - The items serial number - Referencing Items.serialNumber
 ┃ ┃ ┗ toolOfItem - The items name - Referencing Items.tool
 ┃ ┣ user - Array of json objects
 ┃ ┃ ┣ emailOfUser - Email of the user requesting - Referencing Users.email
 ┃ ┃ ┣ givenName - Given name of the user requesting - Referencing Users.givenName
 ┃ ┃ ┣ surname - Surname of the user requesting - Referencing Users.surname
 ┃ ┃ ┗ class - Class/role of the user requesting - Referencing Users.class
 ┃ ┗ _id - The standard MongoDb id
 ┃
 ┗ HistoryLoan - collection
   ┣ ranId - Random string to identify document - Unique Index
   ┣ item - Array of json objects
   ┃ ┣ serialNumberOfItem - The items serial number - Referencing Items.serialNumber
   ┃ ┗ toolOfItem - The items name - Referencing Items.tool
   ┣ user - Array of json objects
   ┃ ┣ emailOfUser - Email of the user that had the loan - Referencing Users.email
   ┃ ┣ givenName - Given name of the user that had the loan - Referencing Users.givenName
   ┃ ┣ surname - Surname of the user that had the loan - Referencing Users.surname
   ┃ ┗ class - Class/role of the user that had the loan - Referencing Users.class
   ┣ loanStartTime - The time the loan started
   ┣ loanEndTime - When the item was returned
   ┗ _id - The standard MongoDb id
```

### Database "references"

Dromtorp.Users.borrowed.**serialNumber** -> Dromtorp.Items.**serialNumber** \

Dromtorp.Items.**borrowedBy** -> Dromtorp.Users.**email** \

Dromtorp.Requests.item.**serialNumberOfItem** -> Dromtorp.Items.**serialNumber** \
Dromtorp.Requests.item.**toolOfItem** -> Dromtorp.Items.**tool** \
Dromtorp.Requests.user.**emailOfUser** -> Dromtorp.Users.**email** \
Dromtorp.Requests.user.**givenName** -> Dromtorp.Users.**givenName** \
Dromtorp.Requests.user.**surname** -> Dromtorp.Users.**surname** \
Dromtorp.Requests.user.**class** -> Dromtorp.Users.**class** \

Dromtorp.HistoryLoan.item.**serialNumberOfItem** -> Dromtorp.Items.**serialNumber** \
Dromtorp.HistoryLoan.item.**toolOfItem** -> Dromtorp.Items.**tool** \
Dromtorp.HistoryLoan.user.**emailOfUser** -> Dromtorp.Users.**email** \
Dromtorp.HistoryLoan.user.**givenName** -> Dromtorp.Users.**givenName** \
Dromtorp.HistoryLoan.user.**surname** -> Dromtorp.Users.**surname** \
Dromtorp.HistoryLoan.user.**class** -> Dromtorp.Users.**class** \