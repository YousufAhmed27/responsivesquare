//Inputs on form [264] [137]
let user = document.querySelector("#cardholder"),
    num = document.querySelector("#cardnum"),
    month = document.querySelector("#month"),
    year = document.querySelector("#year"),
    cvc = document.querySelector("#cvc"),

    userSafe = true,
    userArr = [],
    mo = document.querySelector(".try")

function resetError(e) {
    e.classList.add("err")
    e.classList.remove("done")
    if (e === user) { document.querySelectorAll(".usere").forEach(e => e.style.visibility = "hidden") }
    else if (e === num) { document.querySelectorAll(".nume").forEach(e => e.style.visibility = "hidden") }
    else if (e === month || e === year) { document.querySelectorAll(".datee").forEach(e => e.style.visibility = "hidden") }
    else if (e === cvc) { document.querySelectorAll(".cvce").forEach(e => e.style.visibility = "hidden") }
}
function checkEmpty(e) {
    if (e.value.length === 0) {
        if (e === user) { document.querySelector(".usere.blank").style.visibility = "visible" }
        else if (e === num) { document.querySelector(".nume.blank").style.visibility = "visible" }
        else if (e === month || e === year) { document.querySelector(".datee.blank").style.visibility = "visible" }
        else if (e === cvc) { document.querySelector(".cvce.blank").style.visibility = "visible" }
        return false
    } else { return true }
}
function checkFormate(e) {
    userSafe = true
    if (e === user) {
        userArr = Array.from(user.value)
        userArr.some(function (e) {
            if (Number.isInteger(+(e)) && e !== " ") {
                userSafe = false;
            }
        })
    }
    else {
        userArr = Array.from(e.value)
        userArr.some(function (e) {
            if (Number.isInteger(+(e)) === false) {
                userSafe = false
            }
        })
    }
    userArr = []
    if (userSafe === true) {
        return true
    } else {
        if (e === user) { document.querySelector(".usere.formate").style.visibility = "visible" }
        else if (e === num) { document.querySelector(".nume.formate").style.visibility = "visible" }
        else if (e === month || e === year) { document.querySelector(".datee.formate").style.visibility = "visible" }
        else if (e === cvc) { document.querySelector(".cvce.formate").style.visibility = "visible" }
        return false
    }
}
function done(e) {
    e.classList.add("done")
    e.classList.remove("err")
}

user.onblur = function () {
    resetError(user)
    if (!checkEmpty(user)) { return false } else if (checkFormate(user)) {
        document.querySelector(".user").innerHTML = user.value
        done(user)
    }
}

num.onkeyup = function () { if (num.value.length === 4 || num.value.length === 9 || num.value.length === 14) { num.value += " " } }

num.onblur = function () {
    resetError(num)
    if (!checkEmpty(num)) { return false } else if (checkFormate(num)) {
        if (num.value.length < 19) {
            document.querySelector(".nume.size").style.visibility = "visible"
        } else {
            document.querySelector(".frontCard span").innerHTML = num.value
            done(num)
        }
    }
}

month.onblur = function () {
    resetError(month)
    if (!checkEmpty(month)) { return false } else if (checkFormate(month)) {
        if (+(month.value) > 12) {
            document.querySelector(".datee.real").style.visibility = "visible"
        }
        else {
            if (month.value.length === 1) { document.querySelector(".month").innerHTML = "0" + "" + month.value } else { document.querySelector(".month").innerHTML = month.value }
            done(month)
        }
    }
}

year.onblur = function () {
    resetError(year)
    if (!checkEmpty(year)) { return false } else if (checkFormate(year)) {
        if (+(year.value) <= 23) {
            document.querySelector(".datee.exp").style.visibility = "visible"
        }
        else {
            document.querySelector(".year").innerHTML = year.value
            done(year)
        }
    }
}

cvc.onblur = function () {
    resetError(cvc)
    if (!checkEmpty(cvc)) { return false } else if (checkFormate(cvc)) {
        if (cvc.value.length !== 3) {
            document.querySelector(".cvce.real").style.visibility = "visible"
        }
        else {
            document.querySelector(".backCard span").innerHTML = cvc.value
            done(cvc)
        }
    }
}

document.querySelector(".text button.one").addEventListener("click", function () {
    let ar = Array.from(document.querySelectorAll(".add"))

    if (ar.every(function (e) {
        if (e.classList.contains("done")) {
            return true
        } else {
            false
        }
    })) {
        document.querySelector(".complete.text.flex").classList.add("done")
        document.querySelector(".main").style.visibility = "hidden"
    } else {
        mo.innerHTML = `<div class="overlay"></div><div class="popup"><div class="close">X</div><div class="blah">All Fields Are Required To Continue</div></div>`
        document.querySelector(".try .close").addEventListener("click", function () {
            this.parentElement.remove();
            document.querySelector(".overlay").remove()
        })
    }
})