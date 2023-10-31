const express = require("express");
const cors = require('cors');
const JenisRoute = require("./routes/JenisRoute");
const BarangRoute = require("./routes/BarangRoute")
const History = require("./routes/HistoryRoute")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

app.use('/jenis', JenisRoute)
app.use('/barang', BarangRoute)
app.use('/history', History)


app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}`));