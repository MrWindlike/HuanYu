require('./js/js.js')
require("./js/school.js");
require('./style/school.scss');


new picture({
    "container":$(".container"),
    "showList":$(".showLists"),
    "wrap":$(".wrap"),
    "prev":$("#prev"),
    "next":$("#next"),
    "lists":$(".lists"),
    "dots":$(".dots")
})
