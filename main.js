	window.session=[];
	function getSession(id) {
        const s = window.session.find(s => s.id === id);
        if (s) {
            return s;
        }
        const newSession = { id };
        window.session.push(newSession);
        return newSession;
    }
	
	function renderPIE(model,elementName) {
        setTimeout(() => {
            updateElement(model, model.id,true,elementName);
        }, 500);
    }

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