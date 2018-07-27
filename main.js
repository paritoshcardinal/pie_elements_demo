window.session = [];
function getSession(id) {
  const s = window.session.find(s => s.id === id);
  if (s) {
    return s;
  }
  const newSession = { id };
  window.session.push(newSession);
  return newSession;
}

function renderPIE(model, elementName) {
  setTimeout(() => {
    updateElement(model, model.id, true, elementName);
  }, 500);
}

function updateElement(model, id, updateConfig, elementName) {

  const session = getSession(id);
  window["pie-controller-pie-item"][elementName]
    .model(model, session, { mode: "gather" })
    .then(uiModel => {
      let a = elementName + "[pie-id='" + id + "']";
      let el = window.document.querySelector(a);
      if (el) {
        el.session = session;
        el.model = uiModel;
      }
      //below code show be run when you want to create config object
      if (updateConfig) {
        let b = elementName + "-configure[pie-id='" + id + "']";
        let configEl = window.document.querySelector(b);
        if (configEl) {
          //set the raw model on config - it want's all the info.
          configEl.model = model;
          configEl.addEventListener("model.updated", e => {
            updateElement(e.detail.update, id, false, elementName);
          });
		  

		  /*configEl.addEventListener("insert.image", e => {
            this.handleFileSelect = this.handleFileSelect.bind(this);
			this._insertImageHandler = e.detail;
			this._$fileInput = window.document.querySelector('input[type="file"]');
			this._$fileInput.click();
          });*/
        }
      }
    });
}

/*function handleFileSelect(e) {
	let b ="multiple-choice-configure[pie-id='" + id + "']";
    let configEl = window.document.querySelector(b);
    const file = event.target.files[0];
    configEl._insertImageHandler.fileChosen(file);
    configEl._$fileInput.value = '';
    var reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      /** simulate a delay in uploading 
      setTimeout(() => {
        configEl._insertImageHandler.done(null, dataURL);
        configEl._insertImageHandler = null;
      }, 2000);
    };

    let progress = 0;
    configEl._insertImageHandler.progress(progress);

    range(1, 100).forEach(n => {
      setTimeout(() => {
        configEl._insertImageHandler.progress(n);
      }, n * 20);
    });

    log('[handleFileSelect] reader.readAsDataUrl, file:', file);
    reader.readAsDataURL(file);
  }*/
  
  function connectedCallback() {
	let b ="multiple-choice-configure[pie-id='" + id + "']";
    let configEl = window.document.querySelector(b);
    configEl._$fileInput.addEventListener('change', this.handleFileSelect);
  }

  function disconnectedCallback() {
	let b ="multiple-choice-configure[pie-id='" + id + "']";
    let configEl = window.document.querySelector(b);
    configEl._$fileInput.removeEventListener('change', this.handleFileSelect);
  }



