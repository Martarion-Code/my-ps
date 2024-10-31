-- Create table `users`
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    token_expiry TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table `ps`
CREATE TABLE ps (
    id SERIAL PRIMARY KEY,
    kategori VARCHAR NOT NULL,
    harga VARCHAR NOT NULL,
    stok INTEGER NOT NULL
);

-- Create table `transaksi`
CREATE TABLE transaksi (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    ps_id INTEGER,
    nama_cust VARCHAR NOT NULL,
    no_hp VARCHAR NOT NULL,
    alamat_cust VARCHAR NOT NULL,
    waktu_pinjam INTEGER NOT NULL,
    waktu_kembali INTEGER NOT NULL,
    harga_total VARCHAR NOT null,
    FOREIGN KEY (user_id) references users (id) on delete cascade,
    FOREIGN key (ps_id) references ps (id) on delete cascade
);




drop table transaksi 
