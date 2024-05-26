\c biztime

DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS industry_company;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS industries;

CREATE TABLE companies (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    comp_code TEXT NOT NULL REFERENCES companies(code) ON DELETE CASCADE,
    amt FLOAT NOT NULL CHECK (amt > 0),
    paid BOOLEAN DEFAULT false NOT NULL,
    add_date DATE DEFAULT CURRENT_DATE NOT NULL,
    paid_date DATE
);

CREATE TABLE industries (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) NOT NULL UNIQUE,
    industry VARCHAR(100) NOT NULL
);

CREATE TABLE industry_company (
    id SERIAL PRIMARY KEY,
    company_code TEXT NOT NULL REFERENCES companies(code) ON DELETE CASCADE,
    industry_code VARCHAR(100) NOT NULL REFERENCES industries(code) ON DELETE CASCADE
);

INSERT INTO companies (code, name, description)
VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
       ('ibm', 'IBM', 'Big blue.');

INSERT INTO invoices (comp_code, amt, paid, paid_date)
VALUES ('apple', 100, false, null),
       ('apple', 200, false, null),
       ('apple', 300, true, '2018-01-01'),
       ('ibm', 400, false, null);

INSERT INTO industries (code, industry)
VALUES ('acct', 'Accounting'),
       ('fin', 'Finance'),
       ('tech', 'Technology'),
       ('health', 'Healthcare'),
       ('edu', 'Education'),
       ('eng', 'Engineering'),
       ('mktg', 'Marketing'),
       ('sales', 'Sales');

INSERT INTO industry_company (company_code, industry_code)
VALUES ('apple', 'tech'),
       ('apple', 'fin'),
       ('apple', 'sales'),
       ('apple', 'mktg'),
       ('ibm', 'tech'),
       ('ibm', 'edu'),
       ('ibm', 'eng'),
       ('ibm', 'mktg'),
       ('ibm', 'sales');
