const form = document.getElementById("cat-form");
const ul = document.getElementById("cat-list");
const url = "http://localhost:5000/api/Pets";

function listCats() {
  fetch(url)
    .then((response) => response.json())
    .then((cats) => {
      ul.innerHTML = "";
      cats.map((cat) => {
        let name = document.createElement("span");
        name.innerHTML = `${cat.name}`;

        let detailButton = document.createElement("button");
        detailButton.innerText = "detalhar";
        detailButton.onclick = () => detailCat(cat.id);

        let delButton = document.createElement("button");
        delButton.innerText = "deletar";
        delButton.onclick = () => deleteCat(cat.id);

        let li = document.createElement("li");
        li.appendChild(name);
        li.appendChild(detailButton);
        li.appendChild(delButton);

        ul.appendChild(li);
      });
    })
    .catch(console.log);
}

listCats();

async function detailCat(catId) {
  console.log(catId);
  await fetch(`${url}/${catId}`)
    .then((response) => response.json())
    .then((cat) => {
      console.log(cat);
      setTimeout(() => {
        form.elements["id"].value = cat.id;
        form.elements["name"].value = cat.name;
        form.elements["birthday"].value = new Date(cat.birthday)
          .toISOString()
          .slice(0, 10);
        form.elements["adoptionDate"].value = new Date(cat.adoptionDate)
          .toISOString()
          .slice(0, 10);
      }, 200);
    })
    .catch(console.error);
}

async function deleteCat(catId) {
  console.log(catId);

  let cat = {
    id: catId,
  };

  await fetch(`${url}/${catId}`, {
    method: "delete",
    body: JSON.stringify(cat),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.statusText);
        setTimeout(() => {
          listCats();
        }, 200);
      }
    })
    .catch(console.error);
}

async function submitFormCat(event) {
  event.preventDefault();

  let cat = {
    id: parseInt(form.elements["id"].value),
    name: form.elements["name"].value,
    birthday: form.elements["birthday"].value,
    adoptionDate: form.elements["adoptionDate"].value,
  };

  console.log(cat);
  if (!cat.id || cat.id === 0) {
    console.log("cat to create", cat);
    await createCat(cat).then(() => {
      setTimeout(() => {
        listCats();
      }, 200);
    });
  } else {
    console.log("cat to update", cat);
    await updateCat(cat).then(() => {
      setTimeout(() => {
        listCats();
      }, 200);
    });
  }
}

async function createCat(cat) {
  await fetch(url, {
    method: "post",
    body: JSON.stringify(cat),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        form.reset();
      }
    })
    .catch(console.error);
}

async function updateCat(cat) {
  await fetch(`${url}/${cat.id}`, {
    method: "put",
    body: JSON.stringify(cat),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.s) {
        form.reset();
      }
    })
    .catch(console.error);
}
