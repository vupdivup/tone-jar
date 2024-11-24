export let currentView;

export async function switchView(view) {
    let viewFileName = `./views/${view}.html`;

    let r = await fetch(viewFileName);
    let t = await r.text();

    let target = document.getElementById("dynamic-controls")
    target.innerHTML = t;

    currentView = view;

    let e = new Event("switchview");
    window.dispatchEvent(e);
}