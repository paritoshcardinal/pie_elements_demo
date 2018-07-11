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

<<<<<<< HEAD
function updateElement(model, id, updateConfig, elementName) {
  const session = getSession(id);
  window["pie-controller-pie-item"][elementName]
    .model(Object.assign({}, model), session, { mode: "gather" })
    .then(uiModel => {
      let a = elementName + "[pie-id='" + id + "']";
      let el = window.document.querySelector(a);
      if (el) {
        //NOTE: moved session above model - this is a bug in the categorize element. The order in which you set the properties shouldn't matter - please raise a bug if this is still an issue with the latest categorize element.
        el.session = session;
        el.model = uiModel;
      } else {
        throw new Error("cant find element");
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
=======
    function updateElement(model, id,updateConfig,elementName) {
        const session = getSession(id);
        window['pie-controller-pie-item'][elementName].model(model, session, { mode: 'gather' }).then(uiModel => {
			
            let a = elementName+"[pie-id='" + id + "']";
            let el = window.document.querySelector(a);
            if (el) {
				el.session = session;
                el.model = uiModel;
            }
            //below code show be run when you want to create config object
            if (updateConfig) {
                let b = elementName+"-configure[pie-id='" + id + "']";
                let configEl = window.document.querySelector(b);
                if (configEl) {
                    //set the raw model on config - it want's all the info.
                    configEl.model = uiModel;
                    configEl.addEventListener('model.updated', e => {
                        updateElement(e.detail.update, id, false,elementName);
                    });
                }
            }
        });
    }
>>>>>>> ac2f3848660d68630f1c1f0ea0846d3df56f8a05
