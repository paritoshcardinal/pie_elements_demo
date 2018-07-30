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
        }
      }
    });
}

const whenReady = fn => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      fn();
    });
  } else {
    fn();
  }
};

whenReady(() => {
  /**
   * adding image support for the rich text editors.
   * This is done by handling the 'insert.image' and 'delete.image' events.
   * These events are bubbled up from the configuration custom elements.
   *
   * It is up to you to handle these events and implement the file selection process etc.
   *
   * Here we use a hidden file input and once we've loaded the file we read a data url.
   * This data url gets passed to the insert image handler in the `handler.done(null, url)` function.
   */

  const input = document.querySelector("#hidden-file-input");

  let insertImageHandler = null;

  const handleFileSelect = () => {
    const file = event.target.files[0];

    if (!file) {
      throw new Error("no file..");
      return;
    }

    insertImageHandler.fileChosen(file);
    input.value = "";
    var reader = new FileReader();

    reader.onload = () => {
      console.log("loaded the file contents - send to the handler...");
      const dataURL = reader.result;
      // tell the handler that we have a url and there was no error
      insertImageHandler.done(null, dataURL);
      // clear the ref
      insertImageHandler = null;
    };

    console.log("reader.readAsDataUrl, file:", file);
    reader.readAsDataURL(file);
  };

  /**
   * Add the change handler.
   */
  input.addEventListener("change", handleFileSelect);

  /**
   * Listen for the insert/delete image events.
   * These events bubble so we can listen for them at the root of the object graph aka `document`.
   * You could listen for them at a lower level if you want.
   */
  document.addEventListener("insert.image", event => {
    //keep a reference to the handler so we call call functions on it once we're ready.
    insertImageHandler = event.detail;
    //trigger a click on the hidden file input, this triggers handleFileSelect above.
    input.click();
  });

  document.addEventListener("delete.image", event => {
    //just call the done function on the done handler.
    event.detail.done();
  });
});
