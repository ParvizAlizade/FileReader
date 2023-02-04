let file = document.getElementById("inp");
let images = document.querySelector(".images");
let imgArr = Array.from(images);
let lastContext;
let arr = [];
file.addEventListener("change", function (event) {
  let files = Array.from(event.target.files);
  files.forEach((file) => {
    ShowImage(file);
  });
});

function ShowImage(file) {
  if (!file.type.includes("image/")) {
    alert("Choose img format");
    return;
  }
  if (file.size / 1024 / 1024 > 10) {
    alert("Max size have to be 1MB");
    return;
  }
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.addEventListener("loadend", function () {
    let src = fileReader.result;
    let image = document.createElement("div");
    image.style.position = "relative";
    image.style.width = "250px";
    image.style.height = "250px";
    let closeButton = document.createElement("button");
    closeButton.className = "btn btn-outline-success";
    closeButton.innerText = "X";
    closeButton.style.position = "absolute";
    closeButton.style.right = "0px";

    closeButton.addEventListener("click", function () {
      let ress = confirm("Are you sure to delete this image?");
      if (ress) {
        this.parentElement.remove();

        lastContext ? lastContext.remove() : "null";
        let addElement = document.createElement("div");
        addElement.style.width = "150px";
        addElement.style.height = "150px";
        addElement.style.display = "flex";
        addElement.style.alignItems = "center";
        let addButton = document.createElement("button");
        addButton.className = "btn btn-success";
        addButton.innerText = "Give back";
        addButton.style.width = "100%";
        addButton.style.fontSize = "15px";
        addElement.append(addButton);
        document.body.append(addElement);
        lastContext = addElement;
        addButton.addEventListener("click", function () {
          this.parentElement.remove();
          images.append(image);
        });
      }
    });
    let img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.src = src;
    image.append(img);
    image.append(closeButton);
    images.appendChild(image);
  });
}
