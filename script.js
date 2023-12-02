const list_container = document.querySelector(".list-container");
const input_box = document.querySelector(".input-box input");
const add_btn = document.querySelector(".Add");
const btn_list = document.querySelectorAll(".middle-btns .btn");
const clearBtn = document.querySelectorAll(".btn-clear");
const themeIcon = document.querySelector(".theme_controler img");

let countLeftItems = 0;

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && document.activeElement.tagName === "INPUT") {
        AddItem();
        addStorage();
    }
});

function AddItem() {
    if (input_box.value === "") {
        alert("Fill The Input");
    } else {
        let li = document.createElement("li");
        li.innerHTML = input_box.value;
        list_container.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = `<img src="images/icon-cross.svg"/>`;
        li.appendChild(span);
        addStorage();
    }
    countLeftItems += 1;
    updateCount();
    input_box.value = "";
}

// Add even-list-listener
list_container.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        addStorage();
    } else if (e.target.tagName === "IMG") {
        e.target.parentElement.parentElement.remove();
        addStorage();
        countLeftItems -= 1;
        updateCount();
    }
});

btn_list.forEach((button) => {
    button.addEventListener("click", () => {
        const allTodos = document.querySelectorAll("li");
        switch (button.innerHTML) {
            case "All":
                allTodos.forEach((toDo) => {
                    toDo.classList.remove("hidden");
                });
                break;
            case "Active":
                allTodos.forEach((toDo) => {
                    if (toDo.classList.contains("checked")) {
                        toDo.classList.add("hidden");
                    } else {
                        toDo.classList.remove("hidden");
                    }
                });
                break;
            case "Completed":
                allTodos.forEach((toDo) => {
                    if (!toDo.classList.contains("checked")) {
                        toDo.classList.add("hidden");
                    } else {
                        toDo.classList.remove("hidden");
                    }
                });
            default:
                break;
        }
    });
});

// clearing;
for (let i = 0; i < 2; i++) {
    clearBtn[i].addEventListener("click", () => {
        const listItemsArray = Array.from(list_container.childNodes);
        listItemsArray.forEach((listItem) => {
            if (
                listItem.tagName === "LI" &&
                listItem.classList.contains("checked")
            ) {
                listItem.remove();
                countLeftItems -= 1;
                updateCount();
            }
            addStorage();
        });
    });
}

themeIcon.addEventListener("click", () => {
    // themeIcon.toggle((src = "images/icon-moon.svg"));
    let currentSrc = themeIcon.getAttribute("src");
    let newSrc =
        currentSrc === "images/icon-sun.svg"
            ? "images/icon-moon.svg"
            : "images/icon-sun.svg";

    if (window.innerWidth > 500) {
        document.body.classList.toggle("backgroundToggle");
        if (newSrc === "images/icon-moon.svg") {
            themeSwitch("light");
        } else {
            themeSwitch("dark");
        }
    } else {
        document.body.classList.toggle("small-Device-Background");
        if (newSrc === "images/icon-moon.svg") {
            themeSwitch("light");
        } else {
            themeSwitch("dark");
        }
    }

    themeIcon.setAttribute("src", newSrc);
});

function themeSwitch(mode) {
    const inputBox = document.querySelector(".input-box");
    const details = document.querySelector(".details");
    const mob = document.querySelector(".mob");

    function applyTheme(element) {
        element.classList.add("white_background");
    }

    function removeTheme(element) {
        element.classList.remove("white_background");
    }

    switch (mode) {
        case "light":
            applyTheme(inputBox);
            applyTheme(details);
            applyTheme(mob);

            input_box.id = "input-box-theme";

            clearBtn.forEach((cBtn) => {
                cBtn.setAttribute("id", "light_hover");
            });

            btn_list.forEach((btn) => {
                btn.setAttribute("id", "light_hover");
            });

            list_container.childNodes.forEach((child) => {
                if (child.tagName === "LI") {
                    applyTheme(child);
                    child.id = "input-box-theme";
                }
            });

            break;

        default:
            removeTheme(inputBox);
            removeTheme(details);
            removeTheme(mob);

            input_box.id = "";

            clearBtn.forEach((cBtn) => {
                cBtn.removeAttribute("id");
            });

            btn_list.forEach((btn) => {
                btn.removeAttribute("id");
            });

            list_container.childNodes.forEach((child) => {
                if (child.tagName === "LI") {
                    removeTheme(child);
                    child.id = "";
                }
            });

            break;
    }
}

function addStorage() {
    localStorage.setItem("TodoList", list_container.innerHTML);
}

function showItems() {
    list_container.innerHTML = localStorage.getItem("TodoList");
}

showItems();

function updateCount() {
    countLeftItems = document.querySelectorAll(".list-container li").length;
    // items left
    document.querySelector(
        ".normal"
    ).textContent = `${countLeftItems} items left`;

    document.querySelector(
        ".mob .items-left"
    ).textContent = `${countLeftItems} items left`;
}

updateCount();

function initializeSortable() {
    Sortable.create(list_container);
}

function checkScreenSize() {
    if (window.innerWidth >= 768) {
        initializeSortable();
    }
}

checkScreenSize();

// Check screen size on window resize
window.addEventListener("resize", checkScreenSize);
