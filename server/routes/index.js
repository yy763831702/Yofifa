const playerRoutes = require('./players');
const teamRoutes = require('./teams');
const newsRoutes = require('./news');
const standingRoutes = require('./standings');
const users = require('./users');
const postsRoutes= require('./posts');
const imagesRoutes= require('./images');

const constructorMethod = app => {
    app.use("/players", playerRoutes);
    app.use("/images", imagesRoutes);
    app.use("/posts", postsRoutes);
    app.use("/teams", teamRoutes);
    app.use("/news", newsRoutes);
    app.use("/standings", standingRoutes);
    app.use('/users', users)
    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
