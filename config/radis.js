const radis = require('radis');
const client = radis.createClient();

client.connect();


const cache = await radis.get('masters');
if (cache) {
    return res.json(JSON.parse(cache));
}
const masters = await User.find();
await radis.set('masters', JSON.stringify(masters), 'EX', 3600);
res.json(masters);

module.exports = client;


