getCats(printCats);

function getCats(callback) {
    const request = new XMLHttpRequest();
    let res;
    request.open("GET", "https://paman00.github.io/ajax-mofusand-consume/lib/data.json");
    request.responseType = "json";
    request.send();
    request.onload = () => {
        res = request.response;
        if (res === null) {
            throw new Error("No data found");
        }
        setTimeout(() => callback(res), 1000); // Hardcoded delay to show loading skeletons
    };
}

function printCats(cats) {
    const container = document.getElementById("hero-container");
    container.innerHTML = "";
    container.classList.remove("hero__container--loading");
    cats.forEach((cat, index) => {
        const catCard = document.createElement("a");
        catCard.href = cat.url;
        catCard.target = "_blank";
        catCard.id = `cat-${index}`;
        catCard.classList.add("cat-card");

        const catImageContainer = document.createElement("div");
        catImageContainer.classList.add("cat-card__img-container");

        const catImage = document.createElement("img");
        catImage.src = cat.image.url;
        catImage.alt = cat.image.alt;
        catImage.classList.add("cat-card__img");
        catImageContainer.appendChild(catImage);

        if (cat.image.hover !== undefined) {
            const catImageHover = document.createElement("img");
            catImageHover.src = cat.image.hover;
            catImageHover.alt = cat.image.alt;
            catImageHover.classList.add(
                "cat-card__img",
                "cat-card__img--hover"
            );
            catImageContainer.appendChild(catImageHover);
        }

        const catName = document.createElement("h2");
        catName.textContent = cat.name;
        catName.classList.add("cat-card__name");

        const catTags = document.createElement("ul");
        catTags.classList.add("cat-card__tags");
        cat.tags.forEach(tag => {
            const tagItem = document.createElement("li");
            tagItem.textContent = tag;
            tagItem.classList.add(
                "cat-card__tag",
                `cat-card__tag--${tag.toLowerCase()}`
            );

            catTags.appendChild(tagItem);
        });

        const catDescription = document.createElement("p");
        catDescription.textContent = cat.description;
        catDescription.classList.add("cat-card__description");

        catCard.appendChild(catImageContainer);
        catCard.appendChild(catName);
        catCard.appendChild(catTags);
        catCard.appendChild(catDescription);

        container?.appendChild(catCard);
    });
}
