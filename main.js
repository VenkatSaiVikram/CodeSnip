const plainCode = document.getElementById("plain-code");
const snippetCode = document.getElementById("snippet-code");
const exportCode = document.getElementById("export-code");
const languageButton = document.querySelector("#language");
const exportButton = document.getElementById("export-button");

languageButton.addEventListener("input", () => {
    snippetCode.setAttribute("class", languageButton.value);
    hljs.highlightAll();
})

snippetCode.textContent = plainCode.value;

plainCode.addEventListener("keyup", render)

exportButton.onclick = () => {
    const downloadButton = document.createElement("a");
    exportCode.style.borderRadius = 0;
    html2canvas(exportCode)
    .then((canvas) => {
        canvas.style.height = snippetCode.style.height;
        downloadButton.appendChild(canvas);
        downloadButton.href = canvas.toDataURL();
        downloadButton.download = "snippet.jpg";
        downloadButton.id = "download-button";
        document.body.appendChild(downloadButton);
        downloadButton.target = "_blank";
        downloadButton.click();
        document.body.removeChild(downloadButton);
    })
    exportCode.style.borderRadius = "1rem";
}

function render() {
    snippetCode.textContent = plainCode.value;
    snippetCode.setAttribute("class", languageButton.value);
    hljs.highlightAll();
}

window.addEventListener("keydown", (event) => {
    if (event.key == "Tab") {
        event.preventDefault();
        
        plainCode.value += "    ";
    }
})