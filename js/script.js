var userLang = navigator.language || navigator.userLanguage;
var en = document.getElementById("divEn");
var es = document.getElementById("divEs");

if (userLang.indexOf("es") !== -1) {
    en.style.display = "none";
} else {
    es.style.display = "none";
}