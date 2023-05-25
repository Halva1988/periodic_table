async function getData(url = 'data.json') {
  const response = await fetch(url);
  return await response.json()
}

class Element {
  constructor(data, container, id) {
    this.data = data;
    this.container = document.querySelectorAll(container);
    this.id = id;

    this._createMarkup();
  }

  _createMarkup() {
    const {title, sequenceNumber, atomicWeight, name, link} = this.data;

    this.container.forEach((element, index) => {
      if (index === this.id) {
        element.insertAdjacentHTML('beforeend', `
          <a class="wiki" href="${link}" target="_blank" rel="nofollow noopener noreferrer">
            <div class="element">
              <h3 class="element-title">${title}</h3>
              <h5 class="element-sequenceNumber">${sequenceNumber}</h5>
              <h5 class="element-atomicWeight">${atomicWeight}</h5>
              <h3 class="element-name">${name}</h3>
            </div>
          </a>
        `);
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getData()
    .then(data => {
      const items = data.map((item, id) => new Element(item, '.action', id))
    })
    .catch(error => console.log(error))
})