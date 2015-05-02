var jsone_code = require( "./JSONE.js" );

function Node( url, index )
{
    // Node routes
    this.nextNode_         = null;
    this.previousNode_     = null;
    this.index_            = index;

    // Node data
    this.url_ = url;

    // member functions
    this.log = function()
    {
        console.log( this.index_.toString() + ": " + this.url_);
    };
};

function Pathway()
{
    this.firstNode_ = null;
    this.curNode_   = null;

    this.curURL = function()
    {
        if(this.curNode_ != null)
        {
            return this.curNode_.url_;
        }
        return "";
    };

    // returns true if node added,
    // otherwise returns false
    this.addNode = function ( url )
    {
        if(this.curNode_ == null)
        {
            // create the first node
            node = new Node(url, 0);
            this.firstNode_ = node;
            this.curNode_ = node;
            return true;
        }
        else if( url != this.curURL() ) // avoid duplicates
        {
            // create a new node
            node = new Node(url, this.curNode_.index_ + 1);

            // move current node to new nodes previousNode_
            node.previousNode_ = this.curNode_;

            // link that node's next to the new node
            node.previousNode_.nextNode_ = node;

            // set my curNode_ reference to the new node
            this.curNode_ = node;

            //
            return true;
        }
        return false;
    };

    this.log = function()
    {
        var node = this.firstNode_;

        while( node != null )
        {
            node.log();
            node = node.nextNode_;
        }

    };
};

function end( list )
{
    return list[list.length - 1];
}

exports.Pathway = Pathway;
