export default (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(cors());
  
    app.get('*', queryParserMw);
    app.use('/kecepatan-angins', kecepatanAnginRoute);
    app.use('/kuat-aruss', kuatArusRoute);
    app.use('/suhu-lingkungans', suhuLingkunganRoute);
    app.use('/post-all-data', postAllDataRoute);
    app.use('/tinggi-gelombangs', tinggiGelombangRoute);
    app.use('/user', user)
  
}