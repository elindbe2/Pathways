windows = require("sdk/windows").browserWindows;
tabs = require("sdk/tabs");
pathway_code = require( "./pathway.js");
var buttons = require('sdk/ui/button/toggle');
var { viewFor } = require("sdk/view/core");

var pathway = new pathway_code.Pathway();

var button = buttons.ToggleButton({
                                    id: "pathways-button",
                                    label: "Pathways",
                                    icon: {
                                            "16": "./icon-16.png",
                                            "32": "./icon-32.png",
                                            "64": "./icon-64.png"
                                            },
                                    onChange: handleButtonClick  });

function handleButtonClick(state)
{
    var window = windows.activeWindow;
    var dom_window = viewFor(window);

    if(state.checked == true)
    {
            console.log("pathway logging on");
            dom_window.addEventListener("DOMContentLoaded",addToPathway);
    }
    else
    {
            console.log("pathway logging off, replaying");
            dom_window.removeEventListener("DOMContentLoaded",addToPathway);
    }
}

function addToPathway( event )
{
    var url = tabs.activeTab.url;
    if(pathway.addNode( tabs.activeTab.url ))
        pathway.log();
}
