const { default: axios } = require('axios');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;


app.use(express.json({ extended: true }));


app.use(express.static(path.resolve('client', 'build')));



app.get('/api', async (req, res) => {
    try {
        // ?& size=${ req.query.size }& buyerBroker=58 & sort=contractId, desc
        let url = `https://newweb.nepalstock.com/api/nots/nepse-data/floorsheet${req._parsedUrl.search}`;
        // console.log(req._parsedUrl.search)
        let apiRes = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion' } });
        // console.log((apiRes.data));
        res.json(apiRes.data);

    } catch (error) {
        console.log(error)
        res.status(500);
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})