// load code from mozilla framework
windows = require("sdk/windows").browserWindows;
tabs = require("sdk/tabs");
contextMenu = require("sdk/context-menu");
var { viewFor } = require("sdk/view/core");

// load my code for pathways
pathway_code = require( "./pathway.js");
var pathway = new pathway_code.Pathway();


var toggleContinuousRecordingMenuItem = contextMenu.Item({
  label: "Toggle continuous recording",
  context: contextMenu.PageContext(),
  contentScript: 'self.on("click", function () {' +
                 '  self.postMessage();' +
                 '});',
    onMessage: function ()
               {
                     continuousRecording.toggle();
               }
});

var MenuItem = contextMenu.Item({
  label: "Record this page",
  context: contextMenu.PageContext(),
  contentScript: 'self.on("click", function () {' +
                 '  self.postMessage();' +
                 '});',
    onMessage: function ()
               {
                   addToPathway();
               }
});

var continuousRecording =
{
    enabled: false,

    eventHandler:   function ( event )
                    {
                        addToPathway();
                    },

    toggle: function()
            {
                var window = windows.activeWindow;
                var dom_window = viewFor(window);

                this.enabled = !this.enabled;

                if(this.enabled == true)
                {
                    console.log("pathway logging on");
                    dom_window.addEventListener("DOMContentLoaded",this.eventHandler);
                }
                else
                {
                    console.log("pathway logging off");
                    dom_window.removeEventListener("DOMContentLoaded",this.eventHandler);
                }
            }
};

function addToPathway( )
{
    var url = tabs.activeTab.url;
    if(pathway.addNode( tabs.activeTab.url ))
        pathway.log();
}
