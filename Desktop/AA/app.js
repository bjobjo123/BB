import express from 'express';
import HTTP_CODES from './demo25/utils/httpCodes.mjs';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.env.PORT || 8000;

let decks = {};

app.use(express.json());

app.post('/temp/deck', (req, res) => {
    const deckId = uuidv4();
    const deck = createDeck();
    decks[deckId] = deck;
    res.status(HTTP_CODES.SUCCESS.OK).send({ deck_id: deckId }).end();
});

app.patch('/temp/deck/shuffle/:deck_id', (req, res) => {
    const { deck_id } = req.params;
    const deck = decks[deck_id];
    if (!deck) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Deck not found').end();
    }
    shuffleDeck(deck);
    res.status(HTTP_CODES.SUCCESS.OK).send({ deck_id }).end();
});

app.get('/temp/deck/:deck_id', (req, res) => {
    const { deck_id } = req.params;
    const deck = decks[deck_id];
    if (!deck) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Deck not found').end();
    }
    res.status(HTTP_CODES.SUCCESS.OK).send(deck).end();
});

app.get('/temp/deck/:deck_id/card', (req, res) => {
    const { deck_id } = req.params;
    const deck = decks[deck_id];
    if (!deck) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Deck not found').end();
    }
    if (deck.length === 0) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('No more cards in the deck').end();
    }
    const card = deck.pop();
    res.status(HTTP_CODES.SUCCESS.OK).send(card).end();
});

function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});