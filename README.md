# Node pg Relationship Exercises 1-3 (and further study)

#### Setup
- [x] Create a project folder, a Git repo, and a *package.json*
- [x] Install *express* and *pg* via NPM
- [x] Add *node_modules* to ***.gitignore***

#### Step One: Add a Database
- [x] Create a database, ***biztime***
- [x] Load the initial data from ***data.sql***
- [x] Fix ***db.js*** so that it connects to the database and exports the client object.
- [x] Familiarize yourself with the data model.

#### Step Two: Add Company Routes
- [x] Create ***routes/companies.js*** with a router in it.
- [x] All routes in this file should be found under *companies/*.

All routes here will respond with JSON responses. These responses will be in an object format where the value is the data from the database.

##### Routes Needed:
- [x] **GET** /**companies**: Return list of companies, like `{companies: [{code, name}, ...]}`
- [x] **GET** /**companies/[code]**: Return obj of company: `{company: {code, name, description}}`
- [x] **POST** /**companies**: Adds a company. Needs to be given JSON
- [x] **PATCH** /**companies/[code]**: Edit existing company. Should return 404 if company cannot be found. Needs to be given JSON like: `{name, description}`. Returns updated company object: `{company: {code, name, description}}`
- [x] **DELETE** /**companies**: Deletes company. Should return 404 if company cannot be found. Returns `{status: "deleted}`

#### Step 3: Add Invoices

Add ***routes/invoices.js***. All routes in this file should be prefixed by /**invoices**.

##### Routes

- [x] **GET** /**invoices**: Return info on invoices like `{invoices: [{id, comp_code}, ...]}` 
- [x] **GET** /**invoices/[id]**: Returns obj on given invoice. If invoice cannot be found, returns 404.
- [x] **POST** /**invoices**: Adds an invoice. Needs to be passed in JSON body of: `{comp_code, amt}`. Returns: `{invoice: {id, comp_code, amt, paid, add_date, paid_date}}`
- [x] **PATCH** /**invoices**: Updates an invoice. If invoice cannot be found, returns a 404. Needs to be passed in a JSON body of `{amt}`
- [x] **DELETE** /**invoices**: Deletes an invoice. If invoice cannot be found, returns a 404. Returns: `{status: "deleted"}` Also, one route from the previous part should be updated

##### Slugify Company Names
Customers may have difficuly making up a customer code when creating a company. When they do create a company, it should preferably:
- [x] No spaces
- [x] Weird Puncuation
- [x] All lower-case

##### Allow paying for Invoices
Change the logic of this route:
- [x] **PUT /invoices/[id]**: Updates an invoice. If invoice cannot be found, returns a 404. Needs to be passed in a JSON body of `{amt, paid}`
- [x] If paying unpaid invoice: sets ***paid_date*** to today.
- [x] If un-paying: sets ***paid_date*** to `null`
- [x] Else: Keep current ***paid_date***
Returns: `{invoice: {id, comp_code, amt, paid, add_date, paid_date}}`

##### Add a Many-to-Many
- [x] Add a table for "industries", where there is a ***code*** and an ***industry*** field (for example: "acct" and "Accounting")
- [x] Add a table that allows an industry to be connected to several companies and to have a company belong to several industries.
- [x] Add some sample data (by hand in ***psql*** is fine.);
Change this route:
- [x] When viewing details for a company, you can see the names of the industries for that company
Add routes for:
- [x] Adding an industry.
- [x] Listing all industries, which should show the company code(s) for that industry.
- [x] Associating an industry to a company.