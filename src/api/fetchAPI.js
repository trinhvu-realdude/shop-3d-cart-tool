const BASE_URL = "http://localhost:5000/api/v1";

export const getCategories = async () => {
    const response = await fetch(BASE_URL + "/categories", {
        method: "POST"
    });
    const data = await response.json();
    return data.results;
}

export const getRandomTags = async () => {
    const response = await fetch(BASE_URL + "/random-tags", {
        method: "POST"
    });
    const data = await response.json();
    return data.results;
}

export const getRelatedTags = async (category, title) => {
    const response = await fetch(BASE_URL + "/related", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            category,
            currentTag: title
        })
    });
    const data = await response.json();
    return data.results;
}

export const getImagesByTag = async (tag, category, title) => {
    try {
        const response = await fetch(BASE_URL + `/${tag}/${category}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title
            })
        });
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.log(err);
    }
}

export const getTagsByCategory = async (category) => {
    const response = await fetch(BASE_URL + `/tags/${category}`, {
        method: "POST"
    });
    const data = await response.json();
    return data.results;
}

export const search = async (q) => {
    const response = await fetch(BASE_URL + `/search?q=${q}`, {
        method: "POST"
    });
    const data = await response.json();
    return data;
}