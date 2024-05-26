const express = require('express');
const router = express.Router();
const db = require('../db');
const slugify = require('slugify');
const ExpressError = require('../expressError');

const preferences = {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: true,
    trim: true
};

router.get('/', async (req, res, next) =>{
    /* lists all industires, which should show the company code(s) for that industry */
    try{
        const results = await db.query(`
        SELECT i.industry, ic.company_code FROM industries AS i
        LEFT JOIN industry_company AS ic
        ON (i.code = ic.industry_code)
        `);
        let obj = {};
        results.rows.map((r) =>{
            console.log(r);
            if(obj[r.industry]){
                obj[r.industry].push(r.company_code);
            }
            else{
                obj[r.industry] = [r.company_code];
            }
            return;
        });
        console.log(obj);

        return res.json(obj);
    }
    catch(err){
        return next(err);
    }
});

router.post('/', async (req, res, next) => {
    /* adds an industry to db returns industry obj */
    try{
        const {code, industry} = req.body;
        const results = await db.query ("INSERT INTO industries (code, industry) VALUES $1, $2", [slugify(code, preferences), industry]);
        return res.status(201).json(results.rows[0]);
    }catch(err){
        return next(err);
    }

});

router.post('/', async (req, res, next) => {
    /* adds an industry to db returns industry obj */
    try{
        const {company_code, industry_code} = req.body;
        const get_query = await db.query("SELECT company_code industry_code FROM industry_company");
        if(get_query.rows.length === 0){
            throw new ExpressError("company_code/industry_code not found",404);
        }
        const results = await db.query ("INSERT INTO industry_company (company_code, industry_code) VALUES $1, $2", [company_code, industry_code]);
        return res.status(201).json(results.rows[0]);
    }catch(err){
        return next(err);
    }

});

module.exports = router;