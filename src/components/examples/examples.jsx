//Render Buttons
React.render(
  <div id="buttonExamples">
    <h2>Flat</h2>
    <PP_Button label="Button base" /> &nbsp;
    <PP_Button label="Default" style="default" /> &nbsp;
    <PP_Button label="Primary" style="primary" /> &nbsp;
    <PP_Button label="Success" style="success" /> &nbsp;
    <PP_Button label="Danger" style="danger" /> &nbsp;
    <PP_Button label="Warning" style="warning" /> &nbsp;
    
    <br /><br />
    <h2>Raised</h2>
    <PP_Button label="Button base" raised={true} /> &nbsp;
    <PP_Button label="Default" style="default" raised={true} /> &nbsp;
    <PP_Button label="Primary" style="primary" raised={true} /> &nbsp;
    <PP_Button label="Success" style="success" raised={true} /> &nbsp;
    <PP_Button label="Danger" style="danger" raised={true} /> &nbsp;
    <PP_Button label="Warning" style="warning" raised={true} /> &nbsp;
  </div>,
  document.body
);