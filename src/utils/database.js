const mysql = require("mysql2");

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "bukit_asam_db"
}).promise()

//aman
async function CreateJenis(name) {
    try {
        await pool.query(
            'INSERT INTO jenis VALUE (DEFAULT, ?)',
            [name]
        )

        return {
            status: "Succes"
        };
    } catch (error) {
        console.log(error)
        return {
            status: "Filed"
        }
    }
}
//Aman
async function UpdateJenis(id, name) {
    try {
        await pool.query(
            'UPDATE jenis SET name= ? WHERE jenis.id_jenis = ?',
            [name, id]
        )
        return {
            status: "Succes"
        };
    } catch (error) {
        console.log(error)
        return {
            status: "Filed"
        }
    }
}

// Aman
async function GetJenisAll() {
    const [result] = await pool.query(
        'SELECT * FROM jenis',
        []
    )
    return result;
}

// Aman
async function GetJenisBySearch(search) {
    let status = ""
    let output = []
    try {
        const [result] = await pool.query(
            "SELECT * FROM jenis WHERE jenis.name LIKE CONCAT('%', ?, '%')",
            [search]
        )
        output = result
        status = "Succes"
    } catch (error) {
        console.log(error)
        status = "Filed"

    }
    return {
        status: status,
        data: output
    };

    return result;
}

//AMAN
async function GetbBarangBySearch(search) {
    let status = ""
    let output = []
    try {
        const [result] = await pool.query(
            "SELECT barang.id_barang, barang.name, barang.stock, MIN(jual.jumlah) as min, MAX(jual.jumlah) as max FROM barang left join jual ON jual.fk_id_barang = barang.id_barang WHERE barang.name LIKE CONCAT('%', ?, '%') GROUP BY barang.name",
            [search]
        )

        output = result

        status = "Success"
    } catch (error) {
        console.log(error)
        status = "Filed"
    }
    return {
        status: status,
        data: output
    };
}

//AMAN
async function UpdateBarang(id, name, stock) {
    try {
        await pool.query(
            'UPDATE barang SET name=?, stock= ? WHERE barang.id_barang = ?',
            [name, stock, id]
        )
        return {
            status: "Succes"
        };
    } catch (error) {
        console.log(error)
        return {
            status: "Filed"
        }
    }
}

//AMAN
async function CreateBarang(name, stock) {
    try {
        await pool.query(
            'INSERT INTO barang VALUE (DEFAULT, ?, ?)',
            [name, stock]
        )
        return {
            status: "Succes"
        };
    } catch (error) {
        console.log(error)
        return {
            status: "Filed"
        }
    }
}

//AMAN
async function GetHistory(filter, search) {

    let sql = ""
    let output = []
    let status = ""

    if (filter == "waktu-lama") {
        sql = "SELECT jual.id_jual, barang.name, jual.jumlah, jenis.name as jenis, jual.date FROM jual JOIN barang ON barang.id_barang = jual.fk_id_barang JOIN jenis ON jenis.id_jenis = jual.fk_id_jenis WHERE barang.name LIKE CONCAT('%', ?, '%') ORDER BY jual.date ASC";
    }
    else if (filter == "waktu-baru") {
        sql = "SELECT jual.id_jual, barang.name, jual.jumlah, jenis.name as jenis, jual.date FROM jual JOIN barang ON barang.id_barang = jual.fk_id_barang JOIN jenis ON jenis.id_jenis = jual.fk_id_jenis WHERE barang.name LIKE CONCAT('%', ?, '%') ORDER BY jual.date DESC";
    }
    else if (filter == "nama-asc") {
        sql = "SELECT jual.id_jual, barang.name, jual.jumlah, jenis.name as jenis, jual.date FROM jual JOIN barang ON barang.id_barang = jual.fk_id_barang JOIN jenis ON jenis.id_jenis = jual.fk_id_jenis WHERE barang.name LIKE CONCAT('%', ?, '%') ORDER BY barang.name ASC";
    }
    else if (filter == "nama-desc") {
        sql = "SELECT jual.id_jual, barang.name, jual.jumlah, jenis.name as jenis, jual.date FROM jual JOIN barang ON barang.id_barang = jual.fk_id_barang JOIN jenis ON jenis.id_jenis = jual.fk_id_jenis WHERE barang.name LIKE CONCAT('%', ?, '%') ORDER BY barang.name DESC";
    }

    try {
        const [result] = await pool.query(
            sql,
            [search]
        )

        status = "Success"
        output = result

    } catch (error) {
        console.log(error)
        status = "Filed"
    }
    return {
        status: status,
        data: output
    };
}

//AMAN
async function CreateHistory(date, jumlah, idBarang, idJenis) {
    try {
        await pool.query(
            'INSERT INTO jual VALUES (DEFAULT, ?, ?, ?, ?)',
            [date, jumlah, idBarang, idJenis]
        )
        return {
            status: "Succes"
        };
    } catch (error) {
        console.log(error)
        return {
            status: "Filed"
        }
    }
}



async function DeleteHistory(id) {
    try {
        await pool.query(
            'DELETE FROM jual  WHERE jual.id_jual = ?',
            [id]
        )
        return {
            status: "Succes"
        };
    } catch (error) {
        console.log(error)
        return {
            status: "Filed"
        }
    }
}

module.exports = {
    CreateJenis,
    UpdateJenis,
    GetJenisAll,
    GetJenisBySearch,
    GetbBarangBySearch,
    UpdateBarang,
    CreateBarang,
    GetHistory,
    CreateHistory,
    DeleteHistory
};