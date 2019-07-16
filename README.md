# ColumnResizer

ColumnResizer is a fork of the jQuery plugin [colResizable](http://bacubacu.com/colresizable/). The plugin is rewritten as vanilla ES6 javascript.

## Features

* Supports mouse and touch events
* Persistent layout on refresh
* No external resources
* Lightweight and small footprint
* Customizable column anchors
* Server side rendering

## Usage

Column-resizer can be used directly as a script in a page:

```html
<head>
  <script src="js/column-resizer.js"></script>
  <script type="text/javascript">
     window.onload = function() {
        let resizable = ColumnResizer.default;
        
          new resizable(document.querySelector("#somethingUnique"),{
              liveDrag:true,
              draggingClass:"rangeDrag",
              gripInnerHtml:"<div class='rangeGrip'></div>",
              minWidth:8
          });
     };
  </script>
</head>
<body>	 
  <table id="somethingUnique" width="100%" >
    <tr> <th> header </th> <th> header </th> </tr>
    <tr> <td> cell </td> <td> cell </td> </tr>							
    <tr> <td> cell </td> <td> cell </td> </tr>							
  </table>	
</body>
```

It can also be used as an ES6 module as in this React example:

```javascript
import ColumnResizer from 'column-resizer';
import React, { Component } from 'react';

class MyTable extends Component {
    
    /**  Other implementation ignored ... **/
    
    componentDidMount() {
        if (this.props.resizable) {
            this.enableResize();
        }
    }

    componentWillUnmount() {
        if (this.props.resizable) {
            this.disableResize();
        }
    }

    componentDidUpdate() {
        if (this.props.resizable) {
            this.enableResize();
        }
    }

    componentWillUpdate() {
        if (this.props.resizable) {
            this.disableResize();
        }
    }

    /*
     * In this example, one table controls the resizing of the
     * another table so both tables' columns resize synchronously.
     */
    enableResize() {
        const remoteTable = ReactDOM.findDOMNode(this)
            .querySelector(`#${this.remoteTableId}`);
        const options = this.props.resizerOptions;
        options.remoteTable = remoteTable;
        if (!this.resizer) {
            this.resizer = new ColumnResizer(
                ReactDOM.findDOMNode(this)
                    .querySelector(`#${this.tableId}`), options);
        } else {
            this.resizer.reset(options);
        }
    }

    disableResize() {
        if (this.resizer) {
            /* This will return the current options object.
             *
             * The options, which include the column widths,
             * can be used to re-create the table with the 
             * same column widths as last used.
             */
            this.resizer.reset({ disable: true });
        }
    }
}

```
## Options

*  **resizeMode**: [type: string] [default: 'fit'] [values: 'fit', 'flex', 'overflow']

    It is used to set how the resize method works. Those are the possible values:
    
    * `'fit'`:  this is default resizing model, in which resizing a column does not alter table width, which means that when a column is expanded the next one shrinks. 
    * `'flex'`: table can change its width and each column can shrink or expand independently if there is enough space in the parent container. If there is not enough space, columns will share its width as they are resized. Table will never get bigger than its parent.
    * `'overflow'`: allows resize of columns with overflow of parent container.

___
* **disable**: [type: boolean] [default: false] 

When set to true it aims to remove all previously added enhancements such as events and additional DOM elements assigned by this plugin to a single or collection of tables. It is required to disable a previously *resized* table prior its removal from the document object tree using JavaScript, and also before any DOM manipulations to an already *resized* table such as adding columns, rows, etc.

___
* **disabledColumns**: [type: array of int] [default: []] 

An array of column indexes to be excluded, so it will not be possible to drag them manually.

___
*  **liveDrag**: [type: boolean] [default: false] 

When set to true the table layout is updated while dragging column anchors. liveDrag enabled is more CPU consuming so it is not recommended for slow computers, specially when dealing with huge or extremely complicated tables.

___

*  **partialRefresh**: [type: boolean] [default: false] 

This attribute should be set to true if the table is inside of an updatePanel or any other kind of partial page refresh using ajax. Table's ID should be same before and after the partial partial refresh.

___

* **innerGripHtml**: [type: string] [default: empty string] 

Its purpose is to allow column anchor customization by defining the HTML to be used in the column grips to provide some visual feedback. It can be used in a wide range of ways to obtain very different outputs, and its flexibility can be increased by combining it with the draggingClass attribute.
___

* **draggingClass**: [type: string] [default: internal css class] 

This attribute is used as the css class assigned to column anchors while being dragged. It can be used for visual feedback purposes.
___

* **minWidth**: [type: number] [default: 15] 

This value specifies the minimum width (measured in pixels) that is allowed for the columns.
___

* **headerOnly**: [type: boolean] [default: false] 

This attribute can be used to prevent vertical expansion of the column anchors to fit the table height. If it is set to true, column handler's size will be bounded to the first row's vertical size.
___

* **hoverCursor**: [type: string] [default: "e-resize"] 

This attribute can be used to customize the cursor that will be displayed when the user is positioned on the column anchors.
___

* **dragCursor**: [type: string] [default: "e-resize"] 

Defines the cursor that will be used while the user is resizing a column.
___

* **flush**: [type: boolean] [default: false] 

Flush is to remove all previously stored data related to the current table layout from session storage.
___

* **marginLeft**: [type: string / null] [default: null] 

If the target table contains an explicit margin-left CSS rule, the same value must be used in this attribute (for example: "auto", "20%", "10px"). The reason why it is needed it is because most browsers (all except of legacy IE) don’t allow direct access to the current CSS rule applied to an element in its original units (such as "%", "em" or "auto" values).
___

* **marginRight**: [type: string / null] [default: null] 

It behaves in exactly the same way than the previous attribute but applied to the right margin.
___

* **remoteTable**: [type: Node / null] [default: null] 

Table element whose column widths will be set by the current table. Remote table must have the same number of columns.
___

* **widths**: [type: array of int] [default: []] 

An array of column widths to set the initial width.
___

* **serialize**: [type:Boolean] [default: true] 

Flag to determine if column width data will be saved to session storage.
___

### Events
* **onResize**: [type: function] [default: null] 

If a callback function is supplied it will be fired when the user has ended dragging a column anchor altering the previous table layout. The callback function can obtain a reference to the updated table through the currentTarget attribute of the event retrieved by parameters

___
* **onDrag**: [type: function] [default: null] 

This event is fired while dragging a column anchor if liveDrag is enabled. It can be useful if the table is being used as a multiple range slider. The callback function can obtain a reference to the updated table through the currentTarget attribute of the event retrieved by parameters

