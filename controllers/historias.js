const Historia = require("../models/Historia");

// CRUD
function crearHistoria(req, res) {
  let { titulo, texto, id_Historia, tags, tematica, ficcion } = req.body;
  let historia = new Historia(
    titulo,
    texto,
    id_Historia,
    tags,
    tematica,
    ficcion
  );
  res.send(historia);
}

function obtenerHistorias(req, res) {
  let historia1 = new Historia(
    "El picador criminal mutilador",
    `Dolor non commodo tempor ea culpa tempor eiusmod proident sint Lorem adipisicing. Aliqua laboris Lorem proident laboris est officia deserunt ipsum. Ut sint laborum proident duis reprehenderit ullamco dolor Lorem nulla aute sit. Ea aliquip anim velit id non aliqua amet non ea quis mollit. Consectetur ipsum voluptate officia reprehenderit qui. Nostrud esse cillum dolor magna labore non tempor excepteur. Consequat exercitation nisi incididunt cupidatat adipisicing excepteur.
    Adipisicing eiusmod minim aute enim voluptate cillum aliqua deserunt Lorem consectetur ipsum sunt. Velit commodo dolor aliquip officia velit fugiat et. Consectetur consequat ea voluptate incididunt aliqua pariatur ad. Elit cillum irure sit sunt est laborum.
    Sit ea veniam quis nostrud non incididunt deserunt dolore cupidatat. Laboris culpa voluptate mollit enim ad anim aliquip eu enim quis excepteur. Tempor occaecat velit laborum sunt. Nulla velit id commodo incididunt labore. Ullamco sit minim cillum cupidatat cillum et excepteur ea mollit non enim. Pariatur fugiat tempor quis id mollit exercitation commodo velit in ipsum cillum. Esse reprehenderit deserunt do ea pariatur sit nulla sunt aute.
    Exercitation qui sit nostrud enim esse. Fugiat nostrud Lorem proident voluptate ea Lorem est reprehenderit eu irure proident. Amet cillum deserunt laboris aliquip enim cupidatat anim excepteur sit. Exercitation in excepteur do minim laboris non irure deserunt irure sint consequat reprehenderit nisi. Lorem amet occaecat veniam elit minim exercitation magna in non pariatur reprehenderit. Labore deserunt et amet enim ipsum magna reprehenderit pariatur est ut pariatur.`,
    7,
    ["paranormal", "noche", "nickelodeon"],
    "Paranormal",
    true
  );
  let historia2 = new Historia(
    "Leyenda de la Llorona",
    `Cupidatat culpa minim exercitation magna magna ad non ex. Minim aute anim eiusmod cillum enim minim. Voluptate sit cupidatat tempor reprehenderit commodo adipisicing nostrud quis deserunt voluptate magna aliquip. Ad cupidatat eiusmod veniam eu nostrud. Voluptate ea dolore exercitation duis tempor aliqua nisi eiusmod. Excepteur Lorem Lorem adipisicing irure mollit.
    Anim velit duis Lorem nulla tempor. Ullamco culpa in nisi quis eu et pariatur voluptate ex aliquip ex. Voluptate non exercitation proident dolore veniam adipisicing tempor mollit nisi sint adipisicing sunt minim. Consectetur exercitation consectetur dolore dolore occaecat velit laboris exercitation in proident reprehenderit occaecat. Nostrud amet tempor pariatur quis Lorem dolore ullamco in laborum eiusmod do anim pariatur. Voluptate esse fugiat deserunt est mollit elit sit eiusmod. Id excepteur qui velit excepteur aute cupidatat consectetur culpa deserunt sint.
    Ad ea magna nisi voluptate pariatur irure. Quis cupidatat commodo tempor minim ut aliqua velit dolore aliqua excepteur sint. Consectetur dolore in non duis sint pariatur incididunt pariatur irure excepteur id dolor cillum. Eu mollit tempor deserunt tempor culpa anim aute tempor. Aliqua veniam laborum deserunt anim sint fugiat anim cupidatat incididunt tempor et excepteur sunt. In culpa aliqua est ex voluptate est nulla amet laboris labore ea excepteur qui aute. Aliquip mollit cupidatat aliquip pariatur.`,
    8,
    ["leyenda", "regional", "paranormal", "fantasmas"],
    "Leyendas",
    false
  );
  res.send([historia1, historia2]);
}

function modificarHistoria(req, res) {
  Historia.findById(req.params.id)
  .then(his => {
      if(!his) return res.sendStatus(404);
      const nuevaInfo = req.body;
      const nuevaInfoKeys = Object.keys(nuevaInfo);
      for (let i = 0; i < nuevaInfoKeys.length; i++) {
          if(typeof his[nuevaInfoKeys[i]] !== "undefined"){
              console.log(his[nuevaInfoKeys[i]]);
              his[nuevaInfoKeys[i]] = nuevaInfo[nuevaInfoKeys[i]];
          } else continue;
      }
      us.save()
      .then(updated => res.status(201).json(updated.publicData()))
      .catch(next);
  })
  .catch(next);
}

function eliminarHistoria(req, res) {
  Historia.findOneAndDelete({_id:req.params.id})
  .then(r => res.status(200).send('La historia ha sido eliminada'))
  .catch(next);
}

module.exports = {
    crearHistoria,
    obtenerHistorias,
    modificarHistoria,
    eliminarHistoria
}
