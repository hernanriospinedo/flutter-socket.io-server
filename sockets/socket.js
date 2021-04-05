const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Explosion"));
bands.addBand(new Band("Marilia"));
bands.addBand(new Band("Proyecto S"));

console.log(bands);

// Mensajes de Sockets
io.on("connection", client => {
  console.log("cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnet", () => {
    console.log("cliente desconectado");
  });

  client.on("mensaje", payload => {
    console.log("Mensaje", payload);
    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });

  client.on("vote-band", payload => {

    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());

  });

  client.on("add-band", payload => {
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    io.emit("active-bands", bands.getBands());
    
  });





  /*client.on("emitir-mensaje", payload => {
    //console.log(payload);
    //io.emit('nuevo-mensaje', payload); emite a todos
    client.broadcast.emit("nuevo-mensaje", payload); // emite a todos menos el que lo emitio
  });*/
});
