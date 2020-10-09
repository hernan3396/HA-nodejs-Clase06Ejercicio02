const mongoose = require("mongoose");
const Team = require("./models/Team.js");

module.exports = (app) => {
  app.get("/teams", async (req, res) => {
    try {
      // const test = req.query.sortBy;
      // const arraySortBy = test.split(",");
      // console.log(arraySortBy);
      // aca le podes pasar una lista de de parametros para el sort y luego con un foreach lo ordenas abajo
      // o se lo pasas como objeto y listo, incluido el "code"

      console.log(req.query.skip);
      const teams = await Team.find()
        .sort({ code: req.query.sortBy })
        // { code: req.query.sortBy, id: req.query.id } quedaria algo asi
        .skip(parseInt(req.query.skip));
      // tiene que ser un numero
      if (teams.length) {
        res.status(200).json(teams);
      } else {
        res.status(404).end("no hay equipos");
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.get("/teams/:code", async (req, res) => {
    const teamExists = await Team.findOne({ code: req.params.code });

    try {
      if (teamExists) {
        res.status(200).json(teamExists);
      } else {
        res.status(404).end("el equipo no existe");
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.post("/teams", async (req, res) => {
    const team = new Team(req.body);
    // esto solo funciona cuando las Key en el body y en el schema son iguales

    if (team.code && team.name && team.flag) {
      const teamExists = await Team.findOne({ code: team.code });

      if (teamExists) {
        res.status(400).end("El equipo ya existe");
      } else {
        try {
          const newTeam = await team.save();
          res.status(201).json(newTeam);
        } catch (err) {
          res.status(500).json({ error: err });
        }
      }
    } else {
      res.status(400).end("faltan datos del equipo");
    }
  });

  app.put("/teams", async (req, res) => {
    const team = await Team.findOneAndReplace({ code: "be" }, req.body, {
      new: true,
    }).lean();
    try {
      res.status(200).json(team);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.patch("/teams", async (req, res) => {
    const team = await Team.findOneAndUpdate(
      { code: "UY-editado5" },
      { name: req.body.name },
      { new: true }
    ).lean();

    try {
      res.status(200).json(team);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.delete("/teams", async (req, res) => {
    const team = await Team.delete({ code: "UY-editado5" });

    try {
      res.status(200).json(team);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  // app.patch("/teams/:code/goals", async (req, res) => {
  //   const team = await Team.findOneAndUpdate(
  //     { code: req.params.code },
  //     { $inc: { goals: 1 } },
  //     { new: true }
  //   ).lean();
  //   try {
  //     res.status(200).json(team);
  //   } catch (err) {
  //     res.status(500).json({ error: err });
  //   }
  // });

  app.post("/teams/:teamId/goals", async (req, res) => {
    try {
      const team = await Team.findByIdAndUpdate(
        req.params.teamId,
        {
          $push: {
            goals: {
              author: req.body.author,
              against: req.body.against,
              minute: req.body.minute,
            },
          },
        },
        { new: true }
      ).lean();
      res.status(200).json(team);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.delete("/teams/:teamId/goals", async (req, res) => {
    try {
      const team = await Team.findByIdAndUpdate(
        req.params.teamId,
        {
          $pull: {
            goals: {
              author: req.body.author,
            },
          },
        },
        { new: true }
      );

      res.status(200).json(team);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.patch("/teams/:teamId/goals", async (req, res) => {
    try {
      const team = await Team.findOneAndUpdate(
        {
          _id: req.params.teamId,
          goals: {
            $elemMatch: req.body.find,
          },
        },
        { $set: { "goals.$[]": req.body.update } },
        { new: true }
      );
      res.status(200).json(team);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.delete("/teams/:teamId/goals/last", async (req, res) => {
    try {
      const team = await Team.findOneAndUpdate(
        { _id: req.params.teamId },
        { $pop: { goals: 1 } },
        { new: true }
      ).lean();
      await res.status(200).json(team);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.get("/teams/:teamId/goals/last", async (req, res) => {
    try {
      const team = await Team.findOneAndUpdate(
        { _id: req.params.teamId },
        { $pop: { goals: 1 } },
        { new: true }
      ).lean();
      await res.status(200).json(team);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
};
