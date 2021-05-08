const playerRoutes = require('./players');
const teamRoutes = require('./teams');
const newsRoutes = require('./news');
const standingRoutes = require('./standings');

const constructorMethod = app => {
    app.use("/players", playerRoutes);
    app.use("/teams", teamRoutes);
    app.use("/news", newsRoutes);
    app.use("/standings", standingRoutes);
    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
