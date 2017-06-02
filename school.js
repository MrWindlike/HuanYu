require('./js/js.js')
require("./js/school.js");
require('./style/school.scss');


$("container").picture({
    "container":$(".container"),
    "showList":$(".showLists"),
    "loadding":$(".loadding_wrap"),
    "wrap":$(".wrap"),
    "prev":$("#prev"),
    "next":$("#next"),
    "lists":$(".lists"),
    "dots":$(".dots")
});
