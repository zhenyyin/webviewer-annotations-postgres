
const viewerElement = document.getElementById('viewer');
const DOCUMENT_ID = 'serverless-pdf';
const INITIAL_DOC = 'public/serverless.pdf';
const LICENSE_KEY = 'demo:1749636672911:61c72dfd030000000057a632379d9347d0042dab9efe56f0007f184af7';
let instance;

WebViewer({
  path: 'lib',
  licenseKey: LICENSE_KEY,
  initialDoc: INITIAL_DOC,
  enableAnnotations: true,
  disabledElements: [
    'toolbarGroup-Shapes',
    'toolbarGroup-Edit',
    'toolbarGroup-Forms',
    'toolbarGroup-FillAndSign',
    'toolbarGroup-Comments',
    'toolbarButton-Comment',
    'toolbarButton-Reply',
    'toolbarButton-AddComment',
    'contextMenu-AddComment',
    'contextMenu-Reply',
    'noteState',
    'multiSelectModeButton',
    'inlineComment',
  ]
}, viewerElement).then(webViewerInstance => {
  instance = webViewerInstance;
  const { Core, UI } = webViewerInstance;
  const { documentViewer, annotationManager } = Core;

  UI.disableReplyForAnnotations((_) => true);

  UI.disableFeatures([UI.Feature.InlineComment]);

  // Load annotations when document is loaded
  documentViewer.addEventListener('documentLoaded', loadAnnotations);

  // Save when annotation change event is triggered (adding, modifying or deleting of annotations)
  annotationManager.addEventListener('annotationChanged', (annots, action, options) => {
    // If the event is triggered by importing then it can be ignored
    // This will happen when importing the initial annotations from the server or individual changes from other users
    if (options.imported) return;

    annotationManager.exportAnnotationCommand().then((xfdfStrings) => {
      annots.forEach(function (annot) {
        savexfdfString(DOCUMENT_ID, annot.Id, xfdfStrings);
      });
    });
  });
});

// Load annotations from server
const loadAnnotations = async () => {
  try {
    const rows = await loadxfdfStrings(DOCUMENT_ID);
    const annotations = JSON.parse(rows);

    if (annotations.length > 0) {
      const xfdfStrings = annotations.map(row => row.xfdf_data);
      const { annotationManager } = instance.Core;

      for (const xfdfString of xfdfStrings) {
        await annotationManager.importAnnotationCommand(xfdfString);
      }
    }
  } catch (error) {
    console.error('Error loading annotations:', error);
  }
};

// Make a POST request with document ID, annotation ID and XFDF string
const savexfdfString = (documentId, annotationId, xfdfString) => {
  return new Promise((resolve) => {
    fetch(`/api/annotations?documentId=${documentId}`, {
      method: 'POST',
      body: JSON.stringify({
        annotationId,
        xfdfString
      })
    }).then((res) => {
      if (res.status === 200) {
        resolve();
      }
    });
  });
};

// Make a GET request to get XFDF string
const loadxfdfStrings = (documentId) => {
  return new Promise((resolve) => {
    fetch(`/api/annotations?documentId=${documentId}`, {
      method: 'GET'
    }).then((res) => {
      if (res.status === 200) {
        res.text().then((xfdfStrings) => {
          resolve(xfdfStrings);
        });
      }
    });
  });
};
