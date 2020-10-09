const teams = [
  { code: "ar", name: "Argentina", flag: "🇦🇷" },
  { code: "au", name: "Australia", flag: "🇦🇺" },
  { code: "be", name: "Belgium", flag: "🇧🇪" },
  { code: "br", name: "Brazil", flag: "🇧🇷" },
  { code: "ch", name: "Switzerland", flag: "🇨🇭" },
  { code: "co", name: "Colombia", flag: "🇨🇴" },
  { code: "cr", name: "Costa Rica", flag: "🇨🇷" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "dk", name: "Denmark", flag: "🇩🇰" },
  { code: "eg", name: "Egypt", flag: "🇪🇬" },
  { code: "es", name: "Spain", flag: "🇪🇸" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "hr", name: "Croatia", flag: "🇭🇷" },
  { code: "ir", name: "Iran", flag: "🇮🇷" },
  { code: "is", name: "Iceland", flag: "🇮🇸" },
  { code: "jp", name: "Japan", flag: "🇯🇵" },
  { code: "kr", name: "Korea Republic", flag: "🇰🇷" },
  { code: "ma", name: "Morocco", flag: "🇲🇦" },
  { code: "mx", name: "Mexico", flag: "🇲🇽" },
  { code: "nd", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { code: "ng", name: "Nigeria", flag: "🇳🇬" },
  { code: "pa", name: "Panama", flag: "🇵🇦" },
  { code: "pe", name: "Peru", flag: "🇵🇪" },
  { code: "pl", name: "Poland", flag: "🇵🇱" },
  { code: "pt", name: "Portugal", flag: "🇵🇹" },
  { code: "rs", name: "Serbia", flag: "🇷🇸" },
  { code: "ru", name: "Russia", flag: "🇷🇺" },
  { code: "sa", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "se", name: "Sweden", flag: "🇸🇪" },
  { code: "sn", name: "Senegal", flag: "🇸🇳" },
  { code: "tn", name: "Tunisia", flag: "🇹🇳" },
  { code: "uy", name: "Uruguay", flag: "🇺🇾" },
];

const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/clase06_ejercicio02", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

mongoose.connection.once("open", () => console.log("Conexion establecida"));

const teamSchema = new mongoose.Schema({
  code: String,
  name: String,
  flag: String,
});

const Team = mongoose.model("Team", teamSchema);
// mongoose.connection.dropCollection(Team.collection.name) -> elimina la tabla
const arrayTeam = await Team.insertMany(teams);
// la parte comentada es ineficiente, la de arriba es la posta
// teams.forEach((newTeam) => {
//   const team = new Team({
//     code: newTeam.code,
//     name: newTeam.name,
//     flag: newTeam.flag,
//   });
//   team.save();
// });

console.log("Equipos guardados");
