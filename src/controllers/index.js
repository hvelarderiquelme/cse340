const homePage = (req, res) => {
    const title = 'Home';
    console.log('HOME PAGE HIT');
    res.render('home', { title });
};

export {homePage};