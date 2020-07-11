const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });

app.get('/api/qoutes/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.send({quote});
});

app.get('/api/qoutes', (req, res, next) => {
    if (req.query.person) {
        const found = quotes.filter((quote) => {
            return quote.person == req.query.person;
        });
        if (found) {
            res.send({quotes:found});
        } else {
            res.send({quotes:[]});
        }
    } else {
        res.send({quotes:quotes});
    }
});

app.post('/api/qoutes', (req, res, next) => {
    if (req.query.quote && req.query.person) {
        quote = {
            quote: req.query.quote,
            person: req.query.person
        }
        quotes.push(quote);
        res.send(quote);
    } else {
        res.status(400).send();
    }
});